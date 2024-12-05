import { upload } from '@/lib/middleware/uploadMiddleware';

export const config = {
  api: {
    bodyParser: false, // Required for multer to work with Next.js
  },
};

// Define the POST method as a named export
export async function POST(req, res) {
  try {
    // Wrap the multer middleware in a Promise to handle it in Next.js
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) {
          console.error('Middleware error:', err);
          return reject(err);
        }
        resolve();
      });
    });

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file.filename);
    return res.status(200).json({ filePath: `/uploads/groups/${req.file.filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
}

// Handle unsupported methods
export async function OPTIONS(req, res) {
  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
