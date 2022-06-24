# ℹ Forms

Dynamically generating forms with React and Sitecore JSS

## Creating the FormField

1. Navigate to page http: //local.duke-energy.com:3000/home/products/outdoor-lighting/contact

   - This page calls the `<SingleStepForm />` component in the layout json from Sitecore which have fields that look like this

     ```javascript
     {
       componentName: 'ContentMain',
       content: [{
           uid: '',
           componentName: 'Single Step Form',
           dataSource: '',
           fields: {
               ModelJson: {
                   value: '[ { "title":"Form Name", "fields":{ "Name":{ "label":"Form Name", "type":"input", "value":"Form Name", "name":"Name" }, "Id":{ "label":"Id", "type":"hidden", "value":"", "name":"Id" } }, "fresh":true }, { "title":"Text Input", "fields":{ "FormId":{ "label":"FormId", "type":"hidden", "value":"stepOne", "name":"FormId" }, "Name":{ "label":"Name", "type":"hidden", "value":"textinput", "name":"Name" }, "Id":{ "label":"Id", "type":"input", "value":"fixtureName", "name":"Id" }, "Label":{ "label":"Label", "type":"input", "value":"Fixture Selection", "name":"Label" }, "BackEndLabel":{ "label":"BackEnd Label", "type":"input", "value":"Fixture Selection", "name":"BackEndLabel" }, "Value":{ "label":"Default Value", "type":"input", "value":"", "name":"Value" }, "DefaultValueSource":{ "label":"Default Value Source", "type":"select", "value":[ { "value":"None", "selected":false, "label":"None" }, { "value":"cookie", "selected":true, "label":"Cookie" } ], "name":"DefaultValueSource" }, "DefaultValueKey":{ "label":"Default Value Source Key", "type":"input", "value":"fixtureName", "name":"DefaultValueKey"}]
               }
           }
       }]
     }
     ```

2. `<SingleStepForm />` gets rendered via its composition file converts this JSS fields object as its props.
3. `<SingleStepForm />` checks to make sure that `modelJson.value` exists before parsing it from a string to actual json, creating the variable `formModel`.

   - `fields.ModelJson` ie: `formModel` contains data for every field and their props. It's an array of objects where each object contains information about that field. After parsing the JSS, `formModel` looks like this: (note - only a few fields are shown as an example here)

   ```json
   [
     {
       "title": "Radio List",
       "fields": {
         "FormId": {
           "label": "FormId",
           "type": "hidden",
           "value": "stepOne",
           "name": "FormId"
         },
         "Name": {
           "label": "Name",
           "type": "input",
           "value": "Are you a customer requesting a single light for your yard or property?",
           "name": "Name"
         },
         "Label": {
           "label": "Label",
           "type": "input",
           "value": "Are you a customer requesting a single light for your yard or property?",
           "name": "Label"
         },
         "BackEndLabel": {
           "label": "BackEnd Label",
           "type": "input",
           "value": "Are you a customer requesting a single light for your yard or property?",
           "name": "BackEndLabel"
         },
         "GroupName": {
           "label": "Group Name",
           "type": "input",
           "value": "GroupName",
           "name": "GroupName"
         },
         "Value": {
           "label": "Default Value",
           "type": "input",
           "value": "",
           "name": "Value"
         },
         "Id": {
           "label": "Id",
           "type": "input",
           "value": "radiolist",
           "name": "Id"
         },
         "TooltipText": {
           "label": "Tooltip Text",
           "type": "input",
           "value": "",
           "name": "TooltipText"
         },
         "CustomValidationErrorMsg": {
           "label": "Custom Validation Err. Msg.",
           "type": "input",
           "value": "Please pick an option.",
           "name": "CustomValidationErrorMsg"
         },
         "AppearsOnFormConfirmation": {
           "label": "Appear on Confirmation",
           "type": "checkbox",
           "value": true,
           "name": "AppearsOnFormConfirmation"
         },
         "Required": {
           "label": "Required",
           "type": "checkbox",
           "value": true,
           "name": "Required"
         },
         "InputItems": {
           "label": "Items",
           "type": "radiolist",
           "value": "[{\"text\":\"Yes\",\"value\":\"Yes\"},{\"text\":\"No\",\"value\":\"No\"}]",
           "name": "InputItems"
         }
       },
       "fresh": true
     },
     {
       "title": "Section Header",
       "fields": {
         "FormId": {
           "label": "FormId",
           "type": "hidden",
           "value": "stepOne",
           "name": "FormId"
         },
         "Name": {
           "label": "Name",
           "type": "hidden",
           "value": "sectionhdr",
           "name": "Name"
         },
         "Label": {
           "label": "Label",
           "type": "input",
           "value": "Name & Address",
           "name": "Label"
         },
         "BackEndLabel": {
           "label": "BackEnd Label",
           "type": "input",
           "value": "Name & Address",
           "name": "BackEndLabel"
         },
         "Id": {
           "label": "Id",
           "type": "hidden",
           "value": "sectionhdr",
           "name": "Id"
         }
       },
       "fresh": true
     },
     {
       "title": "First Name",
       "fields": {
         "FormId": {
           "label": "FormId",
           "type": "hidden",
           "value": "stepOne",
           "name": "FormId"
         },
         "Name": {
           "label": "Name",
           "type": "hidden",
           "value": "FirstName",
           "name": "Name"
         },
         "Id": {
           "label": "Id",
           "type": "hidden",
           "value": "FirstName",
           "name": "Id"
         },
         "Label": {
           "label": "Label",
           "type": "hidden",
           "value": "First Name",
           "name": "Label"
         },
         "BackEndLabel": {
           "label": "BackEnd Label",
           "type": "hidden",
           "value": "First Name",
           "name": "BackEndLabel"
         },
         "Value": {
           "label": "Default Value",
           "type": "hidden",
           "value": "",
           "name": "Value"
         },
         "ValidationPattern": {
           "label": "Validation Rule",
           "type": "hidden",
           "value": "lettersWhiteSpace",
           "name": "ValidationPattern"
         },
         "TooltipText": {
           "label": "Tooltip Text",
           "type": "input",
           "value": "",
           "name": "TooltipText"
         },
         "CustomValidationErrorMsg": {
           "label": "Custom Validation Err. Msg.",
           "type": "hidden",
           "value": "Please enter a first name.",
           "name": "CustomValidationErrorMsg"
         },
         "AppearsOnFormConfirmation": {
           "label": "Appear on Confirmation",
           "type": "checkbox",
           "value": false,
           "name": "AppearsOnFormConfirmation"
         },
         "Required": {
           "label": "Required",
           "type": "checkbox",
           "value": true,
           "name": "Required"
         },
         "MinimumLength": {
           "label": "Min. Length",
           "type": "hidden",
           "value": "",
           "name": "MinimumLength"
         },
         "MaximumLength": {
           "label": "Max. Length",
           "type": "hidden",
           "value": "40",
           "name": "MaximumLength"
         },
         "Predefined": {
           "label": "Predefined",
           "type": "hidden",
           "value": "true",
           "name": "Predefined"
         },
         "ColumnWidth": {
           "label": "Column Width",
           "type": "select",
           "value": [
             {
               "value": "2",
               "selected": false,
               "label": "2"
             },
             {
               "value": "3",
               "selected": true,
               "label": "3"
             },
             {
               "value": "4",
               "selected": false,
               "label": "4"
             },
             {
               "value": "5",
               "selected": false,
               "label": "5"
             },
             {
               "value": "6",
               "selected": false,
               "label": "6"
             }
           ],
           "name": "ColumnWidth"
         }
       },
       "fresh": true
     }
   ]
   ```

4. `formModel` then gets passed into `createFormInit()` to process all of this data into something more concise and manageable

   ```javascript

   ```

const createdFields = useMemo(() => createFormInit(formModel, false), \[]);

````
- `createdFields` is memoized to cache the original value and keep it from re-rendering each cycle
- The `false` parameter signifies that its not to return a multidimensional array, just a single array

5. `createFormInit()` is a 'factory' for both `<SingleStepForm />` and `<MultiStepForm />`. We will focus on what happens if this is called from `<SingleStepForm />`.

```typescript

const createFormInit: {
  (arr: Array<ParsedFormModel>, multi: true): CFReturnType[][];
  (arr: Array<ParsedFormModel>, multi: false): CFReturnType[];
} = (arr: Array<ParsedFormModel>, multi: boolean): any => {
  return multi ? multiStepFormFields(arr) : parseFields(arr);
};
````

- The `formModel` array will get passed into `parseFields()`
- `parseFields()` will then run each of the form objects that are inside the `formModel` through yet another and final parser, `createForm()`. It will then save these objects to a new array and filter out any nulls generated by `createForm()` and return this array back to `<SingleStepForm />`
- This function uses a Typescript overload to determine the correct return type depending on which `multi` boolean is passed in

```javascript
const parseFields = (arr: Array<ParsedFormModel>) => {

const items = arr.reduce((acc: Array<CFReturnType | null>, curr) => {

const formField = createForm(curr);
    return [...acc, formField];
  }, []);

// filter out any null values due to early returns from hidden fields
  return items.filter(Boolean) as Array<CFReturnType>;
};
```

\\

### Side note: Important info

1. Since there is a lot of very important information missing from the `fields.ModelJson`, (input type, hidden fields, etc) from Sitecore we need a way to dynamically figure all of this out the best we can, with what we've been given. This is where `mapping.ts` comes in. This file contains 3 sections:

   - `inputMap`

     - `inputMap` is an object with field names as a key and their `dataMap` type as the value. These are basically fields that we've determined to be non-input type fields, such as select, checkbox, heading, etc... or fields that are hidden or unimportant

       ```javascript

       ```

const inputMap: CFMappingType\["inputMap"] = { alternatephone: "phone", "alternate*phone*#": "phone", captcha: "recaptcha", checkbox: "checkbox", checkbox_list: "checkboxGroup",

// ... };

````
- `dataMap`

  - `dataMap` is an object with `inputMap` values as the key and related props as the value. All of these will contain a 'file' value. This is the name of the React component that will be dynamically imported, and some of them will contain a 'props' value. Props is an object that contains more details for that particular input type such as type, icon, masking function etc..

    ```javascript

    ```

const dataMap: CFMappingType["dataMap"] = {

// ...
input: {
file: "Input",
props: { type: "text" },
},
phone: {
file: "Input",
props: {
type: "tel",
icon: "phone",
mask: masks.tel,
},
},
radio: {
file: "RadioGroup",
},

// ...
};
````

- `regexMap`

  - `regexMap` is an object with either a validationPattern name or input type as the key with the value being an object containing an error message and RegEx pattern to be used in validation

    ```javascript

    ```

const regexMap: CFMappingType\["regexMap"] = { email: { message: "Not a valid email format", value: /^\[^\s@]+@\[^\s@]+.\[^\s@]{2,}$/, }, lettersWhiteSpace: { message: "Can only be letters and spaces", value: /^\[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ-]+(\s+\[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)\*$/, }, notSameDigits: { message: "Can only contain numbers", value: /^(\d)\d\*(?!\1)\d+$/, },

// ... };

````
2. Inside `createForm()` it will take the incoming field name and use it to index `inputMap`. At this point one of three things will happen:
   - It will find a match and return that input type
   - It will return a null value (these are currently hidden fields or unimportant fields)
   - It will return undefined\
     \
     If it returns a type we will continue, if it returns a null we return a null out of createForm(), if its undefined we then assume and assign this field with a type 'input'
3. Now that we have the field type (the `inputType` value), we use this to index `dataMap` and return the file and or props from that

   - We take this file name and dynamically import that component (ie: 'Input', 'Heading', 'RadioGroup', 'Tabs', etc..)

   ```javascript
````

const { file, props } = dataMap\[inputType];

const Component = loadable(() => import(`src/components/Form/${file}`));

````
4. We then now build our return object which gets added to the array in `parseFields()` and gets sent back to `<SingleStepForm />`

```javascript
return {
  Component,
  data: getData(fields, title),
  file,
  formName: fields?.FormId?.value,
  id: uid(32),
  props: {
    columns: getColumnWidth(fields.ColumnWidth?.value),
    ...props,
  },
  validations: getValidations(file, fields, props?.type),
};
````

- Component: The React component that was dynamically imported
- data: An object containing details about the field such as maxLength, minLength, placeholder, required, etc..

```typescript
const getData: GetDataProps = ({ fields, title }) => ({
  customValidationErrorMsg:
    fields?.CustomValidationErrorMsg?.value || "field is required",
  items: parseItems(fields?.InputItems?.value),
  label: fields?.Label?.value || "",
  maxLength: parseInt(fields?.MaximumLength?.value) || 524288,
  minLength: parseInt(fields?.MinimumLength?.value) || 0,
  name: fields?.Name?.value,
  placeholder: fields?.PlaceholderText?.value,
  required: fields?.Required?.value || false,
  tabs: fields?.Tabs?.value.split("\n") || [],
  title,
  toolTipText: fields?.TooltipText?.value,
});
```

- file: The name of the component that was dynamically imported
- id: A unique id for each field since sitecore doesn't return usable id's
- props: The props returned from the `dataMap` lookup along with the column width for each field
- validations: Will either be null or an object that contains if it should show on the confirmation screen and the validationPattern if any

```typescript
const getValidations: GetValidationProps = (file, fields, regex = "") => {
  const skipValidation = ["Heading", "Recaptcha", "Tabs"];
  let pattern;

  if (file && skipValidation.includes(file)) return null;

  // Validations will usually come through as a string value from sitecore

  // but can also come through as an array of objects, these have the type 'select'

  // We first need to parse through this array and grab the value of the selected validation pattern
  if (fields?.ValidationPattern?.type === "select") {
    pattern = getSelectedValue(fields.ValidationPattern.value);
  } else {
    pattern = fields?.ValidationPattern?.value;
  }

  return {
    shouldConfirm: fields?.AppearsOnFormConfirmation?.value,
    validationPattern:
      // 1. by regex in mapping props (phone, ssn)

      // 2. by named regex pattern coming from Sitecore
      regexMap[regex] || regexMap[pattern],
  };
};
```

1.  `<SingleStepForm />` then iterates through the `createdFields` array and will:

    - pass the `props.columns` value to `<FieldWrapper />` to determine how wide the field should be in CSS
    - inside `<FieldWrapper />` it will nest the dynamic `<Component />` that was returned and will pass in some props, those are:
      - data: The data object returned from `createForm()`
      - errors: This is an object created by `react-hook-form` that contains key/value pairs of the field name and the error message
      - name: The name of the field from the data object. `react-hook-form` requires the name prop to exist at this point
      - props: The props object returned from `createForm()`
      - register: A function from `react-hook-form` that will eventually get passed all the way down to the input to be called on that input's ref. It has:
        - pattern: A regex pattern matching validation
        - required: A boolean or error message
        - validate: custom function that passes the field's value through a method that returns a boolean

    ```javascript
    <FormComponent onSubmit={handleSubmit(onSubmit)}>
      {createdFields.map(
        ({
          Component,
          data,
          id,
          props,
          validations,
          ...rest
        }: CFReturnType) => {
          return (
            <FieldWrapper columns={props?.columns} key={id}>
              <Component
                register={register({
                  pattern: regexPattern(validations),
                  required: isRequired(data),
                  validate: {
                    match: (value: string) =>
                      matchingEmails(
                        name.toLowerCase(),
                        value,
                        getValues(["email", "emailconf"])
                      ),
                  },
                })}
                {...{ data, errors, name, props, ...rest }}
              />
            </FieldWrapper>
          );
        }
      )}
      <Button type="submit" variant="primary">
        submit
      </Button>
    </FormComponent>
    ```

## Inside the FormField

1. Inside the `/components/Form` folder are all of the FormField components. These components are the default exports from each of these files such as `<FormInput />`

   - The purpose of these components is to take the `createForm()` generated props that were passed in via the `<SingleStepForm />` and to 'normalize' them into simpler generic props for the `<Input />` for example. Each file will have a Form\[Input] component with its related Input component. This Input component will then be used in tests and storybook stories.

     ```javascript

     ```

const FormInput = ({ data, errors, name, props, register, validations, }: FormInputProps) => {

const { mask, type } = props || {};

const { label = "", maxLength, required, toolTipText } = data;

const propData = { error: { hasError: Boolean(errors\[name]?.message), errorMessage: errors\[name]?.message, }, id: label, label, mask, maxLength, name, register, required, type, validations, };

````
   return (
     <div className="relative">
       <InputText {...propData} />
       <div className="hidden lg:block absolute top-0 right-0 mt-4 lg:-mr-48">
         <Tooltip error={Boolean(errors[name])} message={toolTipText} />
       </div>
     </div>
   );
 };
 ```
````

## MultiStepForm

The `<MultiStepForm />` is nearly identical to `<SingleStepForm />` except that it has multiple steps to the form. Like `<SingleStepForm />`, the fields data will also get pushed to `createFormInit()` and from there to `multiStepFormFields()`. It's here that the fields will be parsed through `parsedFields()` and then afterwards they will be separated into an array that contains the `<FormStepper />` fields first and then the fields for the first screen, second screen and so on. This array will look something like this:

```
[[form stepper element], [...first section fields], [...second section fields] ...etc]
```

When this array is finally returned back to `<MultiStepForm>`, the form stepper data is parsed out and passed into the `<FormStepper />` component and the first array of field objects in the remaining array will be rendered out.

```typescript
const formModel: Array<ParsedFormModel> = JSON.parse(modelJson.value);

const createdFields = useMemo(() => createFormInit(formModel, true), []);

const createdFieldsWithoutTabs = [...createdFields.slice(1), []];

const createdFieldsOnlyTabFields = [
  ...createdFields[0][0].data.tabs,
  "Confirmation",
];

// ... return
<FormComponent onSubmit={handleFormSubmit}>
  <FormStepper activeIndex={activeIndex} content={createdFieldsOnlyTabFields} />
  {createdFieldsWithoutTabs.map((innerArray, index) =>
    innerArray.map(
      ({ Component, data, id, props, validations, ...rest }: CFReturnType) => {
        return (
          <FieldWrapper
            className={index === activeIndex ? "block" : "hidden"}
            columns={props?.columns}
            key={id}
          >
            <Component
              register={register({
                pattern: regexPattern(validations),
                required: isRequired(data),
                validate: {
                  match: (value: string) =>
                    matchingEmails(
                      name.toLowerCase(),
                      value,
                      getValues(["email", "emailconf"])
                    ),
                },
              })}
              {...{ data, errors, name, props, ...rest }}
            />
          </FieldWrapper>
        );
      }
    )
  )}
  {isLastStep && <ConfirmationStep data={confirmedValues} {...{ fields }} />}
  <ButtonWrapper />
</FormComponent>;
```

We need to map through the outer array first and then loop through each of the inner array's to render each of the fields. The fields that are not shown on the current step will get a class added to `FieldWrapper` as `hidden`, all of the other fields will get the class, `block`. Since react-hook-form tracks our inputs via a ref, its much easier to just build out all of the steps of the form at once and just hide/show the active fields via CSS. This way we don't lose the ref when the fields get mounted/unmounted from the DOM.

We also need to account for required fields that are now 'hidden' due to not being contained in the `activeStep`. This will cause an error in the browser saying that a required field is not focusable. We get around that by toggling the 'required' prop for that field depending on whether or not its currently in the `activeStep`

React | Typescript | Tailwind | Forms | Unit Tests
