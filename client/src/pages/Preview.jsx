import React from 'react';
import PdfViewer from '../components/Pdfviewer';

const Preview = () => {
  const pdfUrl = 'https://res.cloudinary.com/dtcosojhc/raw/upload/v1710941252/zt6xkmws0ocwop8mcxwr.pdf'; 

  return (
    <div className='w-1/2'>
      <PdfViewer url={pdfUrl} />
    </div>
  );
};

export default Preview;

