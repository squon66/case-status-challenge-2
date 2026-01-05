# Development Notes

## Architecture Decisions

### Data Fetching Strategy: TanStack Query (useQuery)

**Decision**: Chose TanStack Query over React's useOptimistic and Server Actions

**Rationale**:
- **Built-in polling capabilities** via `refetchInterval` for real-time updates
- **Optimistic updates** with automatic rollback on errors
- **Robust error handling** and retry mechanisms
- **Ubiquity and community support** in the React ecosystem

**Caviates**
- **An extra bundle load but negligible**

**Alternative considered**: React's `useOptimistic` + Server Actions
- **Why rejected**: Since there's already a separate Python API, Next.js isn't serving as the primary server
- Server Actions would require manual polling implementation
- No compelling server-side logic to implement in Next.js layer

### Routing Structure

**Decision**: Created dedicated `/clients` route with separate `page.tsx` and `layout.tsx`

**Rationale**:
- **Future scalability** - anticipating additional routes/features
- **Clear separation of concerns** between different application sections
- **Modular architecture** for easier maintenance

### Hybrid SSR + Client-Side Approach

**Decision**: Server-side initial data fetch + client-side polling

**Implementation**:
- Initial data loaded server-side in `page.tsx` for fast first paint
- Client-side `useQuery` takes over for real-time updates and error handling
- Fallback to empty state if server-side fetch fails

**Benefits**:
- Best of both worlds: SSR performance + client-side reactivity
- Graceful degradation if initial fetch fails
- Seamless transition to client-side updates

### Component Architecture

**Decision**: Atomic component design pattern

**Examples**:
- `TextField` built on top of base `TextInput`
- `ClientList` made out of smaller components

**Benefits**:
- **Individual Components do less so therefore less fragile**
- **Reusability** across different contexts
- **Consistent styling** and behavior
- **Easier testing** of individual components

### Backend Integration

**Decision**: Direct API calls to Python backend (no BFF layer)

**Alternative considered**: Backend-for-Frontend (BFF) pattern with Next.js API routes
- **Why rejected**: Unnecessary abstraction layer for this scope
- Direct integration is simpler and more transparent
- No complex data transformation or aggregation needed


## What I'd Improve with More Time

### Component Granularity
- Do more to break down larger components into smaller pieces

### Dynamic Form Generation
- Implement `formConfig`-driven form rendering
- Define form structure in configuration objects
- Dynamically generate form inputs based on config
- Better maintainability and consistency across forms

### Responsive Design
- Mobile-first approach for better mobile experience
- Responsive breakpoints for tablet and desktop

### Hook Architecture
- Make custom hooks more configurable with parameters
- Better abstraction for common patterns

### Styling Organization
- Centralized Tailwind style definitions
- Component-specific style constants
- Design system tokens for consistency

### Type System
- Centralized type declarations in dedicated files
- Better separation between API types and component types


## Known Issues

### Server Response Structure
**Issue**: EXPECTATIONS.md indicated PATCH requests return a `client` property with newly added client data

**Reality**: This property was not returned by the actual API

**Impact**: Prevents seamless optimistic update replacement (onSuccess handler commented out)

**Current workaround**: Using cache invalidation which causes reload flashes


