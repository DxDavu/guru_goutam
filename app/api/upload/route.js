import { NextResponse } from 'next/server';
import { upload } from '@/lib/middleware/uploadMiddleware';

export async function POST(req) {
  try {
    const formData = await new Promise((resolve, reject) => {
      const mockRes = {}; // Mock response for multer
      upload.single('image')(req, mockRes, (err) => {
        if (err) return reject(err);
        resolve(req);
      });
    });

    console.log('Received body:', formData.body);
    console.log('Received file:', formData.file);

    if (!formData.file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    return NextResponse.json(
      { filePath: `/uploads/groups/${formData.file.filename}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
