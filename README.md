import { render } from '@testing-library/react';
import { select } from 'd3';
import FlowChart from './valpre-tree-chart';

jest.mock('d3', () => ({
  select: jest.fn(() => ({
    append: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
    })),
  })),
}));

test('renders the first arrow correctly', () => {
  const mockData = {
    descendants: () => [
      { x: 100, y: 200 },
      { x: 300, y: 400 },
    ],
  };

  render(<FlowChart root={mockData} />);
  expect(select).toHaveBeenCalledWith('svg');
  expect(select().append).toHaveBeenCalledWith('path');
  expect(select().append().attr).toHaveBeenCalledWith('class', 'arrow');
  expect(select().append().attr).toHaveBeenCalledWith('fill', 'gray');
  expect(select().append().attr).toHaveBeenCalledWith(
    'd',
    expect.stringMatching(/^M\d+,\d+ L\d+,\d+$/) // Validate the d attribute
  );
});
--------------------------------------
# clm-react-document-uploader

The `clm-react-document-uploader` is a React-based UI component that enables users to upload documents with ease. It supports drag-and-drop, file validation, and customizable upload workflows.

### Features
- Drag-and-drop functionality
- Multiple file uploads
- File type and size validation
- Customizable callbacks for upload success, error, and progress
- Easy integration with backend APIs

- ## Installation

Install the `clm-react-document-uploader` package using npm or yarn:

```bash
npm install clm-react-document-uploader
# or
yarn add clm-react-document-uploader

## Basic Usage

Import the `DocumentUploader` component and include it in your React application:

```tsx
import React from 'react';
import { DocumentUploader } from 'clm-react-document-uploader';

const App = () => {
  const handleUploadSuccess = (files) => {
    console.log('Uploaded files:', files);
  };

  return (
    <div>
      <h1>Upload Your Documents</h1>
      <DocumentUploader 
        onSuccess={handleUploadSuccess} 
        maxFileSize={5 * 1024 * 1024} // 5 MB
        allowedFileTypes={['.pdf', '.docx']}
      />
    </div>
  );
};

export default App;
## Props

The `DocumentUploader` component accepts the following props:

| Prop              | Type               | Default         | Description                                               |
|-------------------|--------------------|-----------------|-----------------------------------------------------------|
| `maxFileSize`     | `number`           | `10 * 1024 * 1024` (10MB) | Maximum file size allowed (in bytes).                    |
| `allowedFileTypes`| `string[]`         | `[]`            | List of allowed file extensions (e.g., `['.pdf', '.docx']`). |
| `onSuccess`       | `(files: File[]) => void` | `undefined`   | Callback invoked after a successful upload.              |
| `onError`         | `(error: Error) => void` | `undefined`   | Callback invoked when an error occurs.                   |
| `onProgress`      | `(progress: number) => void` | `undefined` | Callback for tracking upload progress.                   |
## Examples

### Drag-and-Drop Example
```tsx
import React from 'react';
import { DocumentUploader } from 'clm-react-document-uploader';

const DragDropUploader = () => {
  const handleUploadSuccess = (files) => {
    console.log('Uploaded files:', files);
  };

  return (
    <DocumentUploader 
      dragAndDrop
      onSuccess={handleUploadSuccess}
      allowedFileTypes={['.png', '.jpg', '.jpeg']}
    />
  );
};

export default DragDropUploader;
## Styling

You can customize the appearance of the uploader using the following methods:

- **CSS Classes:** Override default styles with custom CSS classes.
- **Props:** Use style-related props such as `containerStyle`, `buttonStyle`, etc.

### Example: Custom CSS
```css
.custom-uploader {
  border: 2px dashed #4CAF50;
  padding: 20px;
  border-radius: 8px;
}
## API Integration

The `DocumentUploader` component can be easily integrated with any backend API. Here's an example:

```tsx
const handleUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('documents', file));

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

<DocumentUploader onSuccess={handleUpload} />;
## Error Handling

Use the `onError` prop to handle errors during file uploads:

```tsx
const handleError = (error) => {
  alert(`Upload failed: ${error.message}`);
};

<DocumentUploader onError={handleError} />;
 

