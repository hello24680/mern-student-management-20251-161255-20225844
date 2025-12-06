# Environment Configuration Guide

## Backend Configuration

1. Navigate to the `backend` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and configure your environment variables:

   ```env
   # Server Configuration
   PORT=5000

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/student_db
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/student_db` |

## Frontend Configuration

1. Navigate to the `frontend` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and configure your environment variables:

   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000` |

## Important Notes

- **Never commit `.env` files to version control**
- `.env` files are already in `.gitignore`
- Always use `.env.example` as a template
- Update `.env.example` when adding new environment variables
- For production, use appropriate values (e.g., production database URL)

## Security Best Practices

1. ✅ Keep sensitive data in `.env` files
2. ✅ Use `.env.example` for documentation
3. ✅ Add `.env` to `.gitignore`
4. ✅ Use different values for development and production
5. ✅ Never hardcode sensitive information in source code
