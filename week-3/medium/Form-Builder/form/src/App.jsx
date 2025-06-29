import { useState } from 'react';
import './App.css';

function App() {
  const [field, setField] = useState('');
  const [label, setLabel] = useState('');
  const [submittedField, setSubmittedField] = useState(null);

  const handleField = (e) => {
    setField(e.target.value.toLowerCase());
  };

  const handleLabel = (e) => {
    setLabel(e.target.value);
  };

  const handleSubmit = () => {
    if (field && label) {
      setSubmittedField({ type: field, label });
    } else {
      alert('Please select a field type and enter a label.');
    }
  };

  return (
    <>
      <div className='bg-gray-400 min-h-screen grid grid-cols-2 gap-4 p-20'>
        {/* Form Builder Section */}
        <div className='bg-white p-4 rounded-lg shadow'>
          <h1 className='text-xl font-bold mb-4'>Form Builder</h1>
          <label className='block mb-2 font-medium'>
            Select Field Type
            <select
              className='block w-full mt-1 p-2 border border-gray-300 rounded'
              onChange={handleField}
              value={field}
            >
              <option value="">-- Select a field --</option>
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </label>

          <label className='block mb-4 font-medium'>
            Field Label:
            <input
              type='text'
              value={label}
              onChange={handleLabel}
              className='block w-full mt-1 p-2 border border-gray-300 rounded'
              placeholder='Enter field label'
            />
          </label>

          <button
            onClick={handleSubmit}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Submit
          </button>
        </div>

        {/* Preview Section */}
        <div className='bg-white p-4 rounded-lg shadow'>
          <h1 className='text-xl font-bold mb-4'>Preview</h1>

          {submittedField && (
            <div>
              <label className='block mb-2 font-medium'>
                {submittedField.label}
              </label>

              {submittedField.type === 'text' && (
                <input
                  type='text'
                  className='w-full p-2 border rounded'
                  placeholder='Enter text'
                />
              )}

              {submittedField.type === 'radio' && (
                <div>
                  <label className='mr-4'>
                    <input type='radio' name='preview' className='mr-1' />
                    Option 1
                  </label>
                  <label>
                    <input type='radio' name='preview' className='mr-1' />
                    Option 2
                  </label>
                </div>
              )}

              {submittedField.type === 'checkbox' && (
                <label>
                  <input type='checkbox' className='mr-2' />
                  {submittedField.label}
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
