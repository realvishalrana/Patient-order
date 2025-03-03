# Patient Order 

## Objective

To manage and organize patient orders efficiently, using a JSON server to dynamically populate form fields.

## Overview

The form allows users to add, delete, and rearrange patient orders.
## Form Functionality (Use Reactive Form)

### Adding Orders

- The form starts with zero patient orders.
- Two buttons are provided for adding orders:
  - **Add Medicine Order**
  - **Add Lab Order**
- Clicking either button will append a new order (Medicine or Lab) to the list.

### Managing Orders

- **Rearranging:** Orders can be rearranged using drag-and-drop functionality.
- **Deleting:** Orders can be deleted by the user.

### Limits

- A minimum of 1 order and a maximum of 10 orders can exist at any time.

### Order Sequencing

The sequence in which patient orders are displayed should be preserved when:
- A new order is added.
- An existing order is deleted.
- Orders can be rearranged using drag-and-drop.
- Sequence is denoted by #sequence after "Medicine Order/Lab Order" in `patient-order-test.pdf`

### Example Scenario

Initial order:
- Medicine Order
- Lab Order
- Lab Order

After adding a new Medicine Order:
- Medicine Order
- Lab Order
- Lab Order
- Medicine Order


## JSON Server Integration
- Refer to `command.md` in `json-server` directory for the details to start the json server.

### Medicine Orders

- Use the JSON server to fetch available medicines (http://localhost:3000/medicine).
- Each medicine order will have dependent values:
  - **Medicine Name:** Populated from the JSON server.
  - **Strength:** Populated based on the selected medicine, fetched from the JSON server.
  - **Price:** Automatically populated based on the selected strength, but users can also update it.
  - **Total:** Calculated as `Price x Quantity`.

### Lab Orders

- Use the JSON server to fetch available lab tests (http://localhost:3000/laboratory-test).
- Each lab order will have dependent values:
  - **Lab Test Name:** Populated from the JSON server.
  - **Specimen Type:** Populated based on the selected lab test, fetched from the JSON server, and displayed as comma-separated values.
  - **Price:** Automatically populated based on the selected lab test, but users can also update it.
  - **Priority:** Use the following values as the available options:
    Critical Care
    Standard Care
    Routine Care
    Scheduled Care
  - **Instructions:** Automatically populated based on the selected lab test, but users can also update it.

## Form Submission

- **Error Handling:** Display an error message if any required fields are empty.
- **Validation:** The Save button should be disabled until all required fields are filled.
- **Reset Functionality (Optional):** Ensure the form is reset when the Reset button is pressed.
- **Data Handling:** On submission, print the form data in console.


## Notes

- **UI Reference:** Refer to the `patient-order-test.pdf` and `patient-order-test-ui` directory for UI reference. You can use the HTML/CSS from this folder for the test. 
- You may also use any UI framework (e.g., Material UI, Ant Design, NG Prime, or Other) if you prefer. 
- You can browse the internet to find additional resources or additional help.
- Focus on functionality and code quality over design aesthetics.
- Ensure the functionality works as expected based on the requirements outlined above.
