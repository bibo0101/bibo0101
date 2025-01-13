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
A spinner is a visual indicator used in user interfaces to show that a process or operation is currently in progress. It's typically displayed during loading times, such as when fetching data from an API, submitting a form, or performing any asynchronous operation. Spinners help provide feedback to users, ensuring they know something is happening and the app hasn't frozen.
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
===================================================================
Release Note for formatDate Utility Function
Version: v1.0.0
Release Date: January 9, 2025
Overview
The formatDate utility function has been introduced to the core utility library of the UI component. This function simplifies date and time formatting by returning a localized string with the following format:

<Date> at <Time> (<TimeZone>)

Key Features
Date Formatting:
Converts a JavaScript Date object into a localized date string using the user's locale settings.
Time Formatting:
Formats the time in 24-hour format (en-GB locale) with hours and minutes.
Includes the time zone abbreviation (e.g., GMT, PST).
Reusable and Consistent:
Provides a consistent format for displaying date and time across the application.
Usage Example
The formatDate function can be used to display user-friendly date and time information in the UI.

Input
typescript
Copy code
const formattedDate = formatDate(new Date('2025-01-09T15:30:00Z'));
console.log(formattedDate);
Output
plaintext
Copy code
"09/01/2025 at 15:30 (GMT)"
API Details
Function Signature
typescript
Copy code
export const formatDate = (inputDate: Date): string;
Parameters
Parameter	Type	Description
inputDate	Date	The JavaScript Date object to be formatted.
Return Value
A string representing the formatted date and time in the format:
php
Copy code
<Date> at <Time> (<TimeZone>)
Release Highlights
New Utility: A utility function for formatting dates and times has been added to improve consistency in displaying date-time information across the application.
Localization: Supports user-specific locales for date formatting.
24-hour Time Format: Adopts the en-GB locale for time to align with the 24-hour format requirements.
Changelog
Added the formatDate utility function.
Ensures compatibility with internationalized applications by leveraging toLocaleDateString and toLocaleTimeString.
Notes for Developers
Ensure the input to the function is a valid JavaScript Date object. Passing invalid date objects may result in unexpected behavior or errors.
The function is designed for general use but can be customized further for specific localization needs if required.
Known Limitations
The function does not handle invalid date formats and assumes the input is always valid.
Time zone names are provided in standard abbreviations (e.g., GMT, PST), and further customization may require additional development.


 ====================================================================
clm-react-dynamic-form-element Documentation
Overview
The clm-react-dynamic-form-element component is a flexible, reusable, and configurable UI library designed to dynamically render form elements based on provided configuration. It supports various input types, validation rules, and dynamic data binding to streamline form creation in React applications.

Key Features
Dynamic Form Rendering:
Renders form elements dynamically based on JSON configuration.
Input Type Support:
Supports input fields like text, textarea, select, radio, checkbox, date, and more.
Validation:
Supports built-in validation rules (e.g., required, min/max length, regex) and custom validators.
Event Handling:
Handles on-change, on-blur, and custom event handlers.
Styling:
Fully customizable styling through CSS or class-based properties.
Integration:
Can be integrated with state management libraries (e.g., Redux, Zustand) or React hooks.
Blueprint Integration:
Built-in compatibility with Barclays Blueprint CSS/React for styling consistency.
Installation
To install the package, run:

bash
Copy code
npm install clm-react-dynamic-form-element
Or, if you use Yarn:

bash
Copy code
yarn add clm-react-dynamic-form-element
Usage
Basic Example
Below is an example of how to use clm-react-dynamic-form-element to create a simple dynamic form.

JSON Configuration
json
Copy code
const formConfig = [
  {
    id: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    validation: { required: true, minLength: 2 },
  },
  {
    id: "age",
    type: "number",
    label: "Age",
    placeholder: "Enter your age",
    validation: { required: true, min: 18 },
  },
  {
    id: "gender",
    type: "select",
    label: "Gender",
    options: ["Male", "Female", "Other"],
    validation: { required: true },
  },
  {
    id: "terms",
    type: "checkbox",
    label: "Accept Terms & Conditions",
    validation: { required: true },
  },
];
React Component
tsx
Copy code
import React from "react";
import { DynamicFormElement } from "clm-react-dynamic-form-element";

const App = () => {
  const handleSubmit = (formData) => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <DynamicFormElement
        config={formConfig}
        onSubmit={handleSubmit}
        buttonLabel="Submit"
      />
    </div>
  );
};

export default App;
Props
Prop Name	Type	Required	Description
config	Array<Object>	Yes	Configuration array defining the form structure, element types, and validation rules.
onSubmit	Function	Yes	Callback function triggered on form submission with the form data.
onChange	Function	No	Callback function triggered on input change for real-time updates.
buttonLabel	string	No	Customizable label for the submit button (default: "Submit").
className	string	No	Custom class for additional styling.
style	object	No	Inline style object for additional customization.
Validation Rules
Built-in Validators:
Required: Ensures the field is not empty.
Min/Max Length: Sets character length boundaries for text inputs.
Regex: Validates against a custom regular expression.
Custom Validators: Accepts a function to handle validation logic.
Event Handling
Event Name	Description
onSubmit	Triggered when the form is submitted.
onChange	Triggered on every input field change.
onBlur	Triggered when an input field loses focus.
Customization
Styling with Blueprint CSS:
Use className or Blueprint-specific classes like bp3-input, bp3-button, etc., for styling.
Example:
tsx
Copy code
<DynamicFormElement
  config={formConfig}
  className="bp3-dark"
/>
Dynamic Rendering:
Fields can be conditionally displayed based on other field values using conditional logic in the JSON configuration.

Advanced Usage
Custom Components
You can pass custom React components for specific input fields using a customComponent property.

Example:
tsx
Copy code
const formConfig = [
  {
    id: "profilePicture",
    type: "custom",
    label: "Profile Picture",
    customComponent: <FileUploader />,
  },
];
Release Notes
Version 1.0.0
Added support for text, number, select, radio, checkbox, and date inputs.
Introduced JSON-based dynamic form configuration.
Added validation support (built-in and custom).
Enabled event handlers for form submission and input changes.
Future Enhancements
Add support for dynamic field addition/removal.
Provide integration with third-party libraries like Formik and React Hook Form.
Introduce a drag-and-drop form builder.
Known Limitations
Limited customization for advanced layouts. Requires additional CSS for non-standard designs.
Nested field groups are not supported in this version.
Support
For issues, feature requests, or contributions, please visit the GitHub Repository or contact the development team.

Let me know if you'd like to expand any specific sections!
==========================================================================================
This file defines a reusable checkbox component. It is typically used for toggling boolean values (e.g., true/false) in a form.

Key Features
Customizable label.
Supports dynamic state changes.
Works with the Context API for shared state management.
===========================================================================================
File: config-provider.tsx
Purpose
The config-provider.tsx file serves as a centralized configuration and state management solution for the application. It uses the Context API to provide global configurations and shared state to all components within the application, eliminating the need for props drilling or external state management libraries like Redux.

Key Features
Global State Management: Provides a shared configuration object accessible to all components within its tree.
Dynamic Updates: Allows for real-time updates to configuration values using the updateConfig function.
Ease of Integration: Simplifies how components access and manage configurations through the useConfig hook.
Scalability: Can handle an unlimited number of configuration options and easily integrate new ones.
API Reference
1. ConfigProvider Component
The ConfigProvider is a higher-order component that wraps other components to provide access to the shared configuration context.

Props
Prop	Type	Description	Required
children	ReactNode	The components wrapped by the provider.	Yes
initialConfig	object	The initial configuration settings.	No
Example Usage
tsx
Copy code
<ConfigProvider initialConfig={{ theme: "dark", language: "en" }}>
  <YourComponent />
</ConfigProvider>
2. useConfig Hook
The useConfig hook provides access to the configuration context. It allows components to:

Retrieve the current configuration object.
Update specific configuration values dynamically.
Returns
Key	Type	Description
config	object	The current configuration object.
updateConfig	function	Function to update specific configuration keys.
Example Usage
tsx
Copy code
import { useConfig } from "./config-provider";

const MyComponent = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div>
      <p>Current Theme: {config.theme}</p>
      <button onClick={() => updateConfig("theme", "light")}>Switch Theme</button>
    </div>
  );
};
Code Overview
Below is the implementation of config-provider.tsx:

tsx
Copy code
import React, { createContext, useContext, useState } from "react";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children, initialConfig }) => {
  const [config, setConfig] = useState(initialConfig || {});

  const updateConfig = (key, value) => {
    setConfig((prevConfig) => ({ ...prevConfig, [key]: value }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
Integration
The ConfigProvider can be used as a wrapper for your application or specific component trees that require access to global configurations. For example:

tsx
Copy code
import React from "react";
import { ConfigProvider } from "./config-provider";
import MyComponent from "./MyComponent";

const App = () => (
  <ConfigProvider initialConfig={{ theme: "dark", language: "en" }}>
    <MyComponent />
  </ConfigProvider>
);

export default App;
Use Cases
Dynamic Theme Management:
Pass themes (e.g., light, dark) to the provider and allow components to dynamically switch themes.
Localization:
Provide global language settings (language: en) and allow real-time updates (e.g., to fr, es).
Form Configurations:
Share and dynamically update form-related settings (e.g., validation rules, placeholders).
Benefits
Simplifies State Management: Eliminates the need for Redux or other state management libraries.
Centralized Configuration: All configuration is managed in one place, ensuring consistency.
Extensibility: Easily add new configurations without refactoring existing components.
This documentation provides a detailed understanding of the purpose, usage, and integration of the config-provider.tsx file in your project. Let me know if you'd like further refinements!



Props
Prop	Type	Description	Required
children	ReactNode	The components that will have access to the configuration context.	Yes
entitlement	object	A set of entitlement values used for feature gating or access control.	No
url	string	Base URL or API endpoint to be shared globally.	No
generateDefaultValue	boolean	A flag to determine whether to use default values in the configuration.	No
















