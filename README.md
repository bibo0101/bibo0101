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
==============================================================================spinner
Features
Lightweight and easy to use.
Fully customizable size, color, and style.
Supports multiple spinner types (e.g., circular, dots, bars).
Can be used inline or as a fullscreen loader.
Accessible with ARIA support.
Installation
To install the clm-spinner component, use the following command:

bash
Copy code
npm install clm-spinner
or

bash
Copy code
yarn add clm-spinner
Usage
Basic Example
tsx
Copy code
import React from "react";
import { ClmSpinner } from "clm-spinner";

const App = () => (
  <div>
    <h1>Loading Example</h1>
    <ClmSpinner />
  </div>
);

export default App;
Props
Prop	Type	Default	Description
type	string	"circular"	The type of spinner. Options: "circular", "dots", "bars".
size	string or number	"medium"	Size of the spinner. Options: "small", "medium", "large" or a custom value in pixels.
color	string	"primary"	The color of the spinner. Supports named colors (e.g., "primary", "success") or hex codes.
fullscreen	boolean	false	Whether the spinner should cover the entire screen.
ariaLabel	string	"Loading..."	The ARIA label for accessibility.
className	string	""	Custom CSS class for additional styling.
Customizing the Spinner
1. Changing Size
You can customize the spinner size using the size prop:

tsx
Copy code
<ClmSpinner size="small" />
<ClmSpinner size="large" />
<ClmSpinner size={50} /> {/* Custom size in pixels */}
2. Changing Type
Switch between different spinner types:

tsx
Copy code
<ClmSpinner type="dots" />
<ClmSpinner type="bars" />
3. Changing Color
Use predefined colors or custom HEX/RGB values:

tsx
Copy code
<ClmSpinner color="success" />
<ClmSpinner color="#FF5733" />
4. Fullscreen Loader
Display a fullscreen spinner for loading states:

tsx
Copy code
<ClmSpinner fullscreen={true} />
5. Custom Styling
Add custom styles with the className prop:

tsx
Copy code
<ClmSpinner className="my-custom-spinner" />
You can define your styles in a CSS file:

css
Copy code
.my-custom-spinner {
  border: 4px solid #ff5733;
  animation-duration: 1s;
}
Accessibility
The clm-spinner component includes ARIA attributes to ensure accessibility. The ariaLabel prop can be customized:

tsx
Copy code
<ClmSpinner ariaLabel="Content is loading, please wait." />
Examples
Inline Spinner
tsx
Copy code
<p>Data is being loaded <ClmSpinner size="small" type="dots" /> please wait...</p>
Spinner with Custom Color and Size
tsx
Copy code
<ClmSpinner color="#007ACC" size={100} type="circular" />
Fullscreen Spinner
tsx
Copy code
<ClmSpinner fullscreen={true} color="primary" />
Styling
The clm-spinner component supports both built-in styles and custom CSS. Use the following CSS variables to control the appearance:

CSS Variable	Description	Default Value
--clm-spinner-size	Controls the spinner size	40px
--clm-spinner-color	Spinner color	#000
--clm-spinner-speed	Animation speed	0.8s
Example:

css
Copy code
:root {
  --clm-spinner-size: 50px;
  --clm-spinner-color: #007ACC;
  --clm-spinner-speed: 1s;
}
Best Practices
Use fullscreen for application-level loading states.
Combine with text to provide additional context for users, e.g., "Loading, please wait..."
Always include an accessible ARIA label for screen readers.
Known Issues
In legacy browsers, animations may not perform as expected. Consider using a polyfill for better support.
When using fullscreen, ensure it does not overlap fixed elements like headers.
Changelog
Version 1.0.0
Initial release of clm-spinner.
Supports circular, dots, and bars spinner types.
Added customization options for size, color, and fullscreen mode.
FAQs
How do I center the spinner?
Use a flex container or absolute positioning:

css
Copy code
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
Can I use the spinner without React?
Currently, clm-spinner is designed for React. For vanilla JS, consider using a CSS spinner.

Support
For issues or feature requests, visit the GitHub repository.

 

