// export function ClientList({ clients, isRefetching }: { clients: Client[], isRefetching: boolean }) {
//   return (
//     <div className="flex flex-row w-full">
//       {isRefetching && (
//         <div className="absolute top-2 right-2 text-sm text-blue-500">
//           Refreshing...
//         </div>
//       )}
//       <ul className="w-full">
//         {clients.length > 0 ? (
//           clients.map((client) => (
//             <li key={client.id} className="w-full">
//               <ClientRow client={client} />
//             </li>
//           ))
//         ) : (
//           <li className="w-full text-center p-8 text-gray-500">
//             No clients found. Make sure the backend is running on http://localhost:5001
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }

