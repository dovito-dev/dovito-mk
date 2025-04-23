
# Environment Variables Setup

## Setup Instructions

1. Copy the `.env.example` file to a new file named `.env` in the project root:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file to add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_actual_supabase_url
   VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   ```

3. Note: The `.env` file is already ignored in the project's `.gitignore` to prevent committing secrets.

## Using Environment Variables in the Code

To use these environment variables in your code:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

This approach ensures your secrets remain secure and aren't committed to the repository.
