import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from helper import ImportCaseHelper, ClientRepository


class Firm:
    def __init__(self, id, is_corporate=False):
        self.id = id
        self.is_corporate = is_corporate
        self.integration_settings = {
            "update_client_missing_data": True,
            "sync_client_contact_info": True,
        }


class ImportClientHandlerTestCase(unittest.TestCase):
    def setUp(self):
        import app

        app.app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        app.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        self.app = app.app
        self.app_context = self.app.app_context()
        self.app_context.push()
        app.db.drop_all()
        app.db.create_all()
        self.session = app.db.session
        self.firm = Firm(id=1)

    def tearDown(self):
        import app

        app.db.session.remove()
        app.db.drop_all()
        self.app_context.pop()

    def test_update_preexisting_client(self):
        from app import Client

        # Create a client first
        row = {}
        field_names = {
            "first_name": "Alice",
            "last_name": "Brown",
            "email": "alice.brown@example.com",
            "phone_numbers": ["5559876543"],
            "type": "Person",
        }
        ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=row,
            field_names=field_names,
            integration_type=None,
            integration_id="int-789",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )
        # Update the client using import_client_handler
        updated_row = {}
        updated_field_names = {
            "first_name": "Alicia",
            "last_name": "Brown",
            "email": "alice.brown@example.com",
            "phone_numbers": ["5559876543"],
            "type": "Person",
        }
        ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=updated_row,
            field_names=updated_field_names,
            integration_type=None,
            integration_id="int-789",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )
        client = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-789"
        )
        self.assertIsNotNone(client)
        self.assertEqual(client.first_name, "Alicia")
        self.assertEqual(client.last_name, "Brown")
        self.assertEqual(client.email, "alice.brown@example.com")

    def test_import_client_handler_creates_client(self):
        row = {}
        field_names = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone_numbers": ["1234567890"],
            "type": "Person",
        }
        result = ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=row,
            field_names=field_names,
            integration_type=None,
            integration_id="int-123",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )
        client = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-123"
        )
        self.assertIsNotNone(client)
        self.assertEqual(client.first_name, "John")
        self.assertEqual(client.last_name, "Doe")
        self.assertEqual(client.email, "john.doe@example.com")
        self.assertEqual(client.integration_id, "int-123")

    def test_delete_client(self):
        from app import Client

        # First create a client
        row = {}
        field_names = {
            "first_name": "Bob",
            "last_name": "Smith",
            "email": "bob.smith@example.com",
            "phone_numbers": ["5551234567"],
            "type": "Person",
        }
        result = ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=row,
            field_names=field_names,
            integration_type=None,
            integration_id="int-delete-test",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )

        # Verify client was created
        client = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-delete-test"
        )
        self.assertIsNotNone(client)
        client_id = client.id

        # Delete the client via the endpoint
        with self.app.test_client() as test_client:
            response = test_client.delete(f"/clients/{client_id}")
            self.assertEqual(response.status_code, 200)
            data = response.get_json()
            self.assertEqual(data["status"], "success")
            self.assertIn("deleted", data["result"])

        # Verify client is actually deleted from database
        deleted_client = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-delete-test"
        )
        self.assertIsNone(deleted_client)

    def test_delete_nonexistent_client(self):
        # Try to delete a client that doesn't exist
        with self.app.test_client() as test_client:
            response = test_client.delete("/clients/99999")
            self.assertEqual(response.status_code, 404)
            data = response.get_json()
            self.assertEqual(data["status"], "error")
            self.assertIn("not found", data["errors"])

    def test_create_multiple_clients_with_unique_integration_ids(self):
        """Test that creating clients with unique integration_ids and emails creates separate clients
        even when they share the same phone number"""
        from app import Client

        # Create first client
        row1 = {}
        field_names1 = {
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone_numbers": ["5551234567"],  # Same phone for both clients
            "type": "Person",
        }
        ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=row1,
            field_names=field_names1,
            integration_type=None,
            integration_id="int-unique-1",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )

        # Create second client with different integration_id and email but SAME phone number
        # This is the critical test case: without the fix, it would find the first client
        # by phone number and update it instead of creating a new client
        row2 = {}
        field_names2 = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone_numbers": ["5551234567"],  # Same phone as first client
            "type": "Person",
        }
        ImportCaseHelper.import_client_handler(
            session=self.session,
            firm=self.firm,
            row=row2,
            field_names=field_names2,
            integration_type=None,
            integration_id="int-unique-2",
            matter_id=None,
            integration_response_object=None,
            create_new_client=True,
            validation=False,
        )

        # Verify first client still exists with original data
        client1 = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-unique-1"
        )
        self.assertIsNotNone(client1)
        self.assertEqual(client1.first_name, "Jane")
        self.assertEqual(client1.last_name, "Smith")
        self.assertEqual(client1.email, "jane.smith@example.com")
        self.assertEqual(client1.integration_id, "int-unique-1")

        # Verify second client exists with its own data
        client2 = ClientRepository.find_by_integration_id(
            self.session, self.firm.id, "int-unique-2"
        )
        self.assertIsNotNone(client2)
        self.assertEqual(client2.first_name, "John")
        self.assertEqual(client2.last_name, "Doe")
        self.assertEqual(client2.email, "john.doe@example.com")
        self.assertEqual(client2.integration_id, "int-unique-2")

        # Verify they are different clients (different IDs)
        self.assertNotEqual(client1.id, client2.id)

        # Verify there are exactly 2 clients in the database
        all_clients = self.session.query(Client).filter_by(firm_id=self.firm.id).all()
        self.assertEqual(len(all_clients), 2)


if __name__ == "__main__":
    unittest.main()
