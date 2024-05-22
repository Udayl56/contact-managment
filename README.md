# Contact Management with Chart And Map

A demo is available [here](https://contact-managment-5qj0p5s43-uday-ladhi.vercel.app/).

## Features

- Add, Edit, Update contact
- Line Chart of COVID-19 Diseases
- Map for viewing country-specific COVID-19 patients data

## Installation

To run this project locally on your machine, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Udayl56/contact-managment
    cd contact-management
    ```

2. **Install the dependencies**:
    ```sh
    npm install
    ```

3. **Run the project**:
    ```sh
    npm run dev
    ```

## Endpoints / URL Routes 

1. **/** 
   - `Main index file or entry point`

2. **/create-contact** 
   - `Create new contact`

3. **/edit-contact/:id** 
   - `Edit existing contact (Dynamic route)`

4. **/chart-map** 
   - `Show chart and map data`
       
## APIs Used

1. Graph data for cases with date: For Chart
    ```sh
    https://disease.sh/v3/covid-19/historical/all?lastdays=all
    ```

2. Country-specific data of cases: For Map
    ```sh
    https://disease.sh/v3/covid-19/countries
    ```

## Packages Used

- **react-router-dom**: For routing and navigation
- **react-query**: For data fetching, caching, and synchronization
- **react-redux, @reduxjs/toolkit**: For state management
- **react-leaflet**: For interactive maps
- **axios**: For making HTTP requests
- **chart.js**: For creating charts and graphs
- **reactjs-popup**: For creating popups
- **react-icons**: For icons

## Usage

### Adding a Contact

1. Navigate to the "Add Contact" page.
2. Fill in the required information in the form fields.
3. Click the "Save" button to add the contact.

### Editing a Contact

1. Navigate to the contact list.
2. Click on the "Edit" button next to the contact you want to edit.
3. Update the information in the form fields.
4. Click the "Save" button to update the contact.

### Deleting a Contact

1. Navigate to the contact list.
2. Click on the "Delete" button next to the contact you want to remove.

### Viewing COVID-19 Data

- **Line Chart**: View the trend of COVID-19 cases over time.
- **Map**: Explore country-specific COVID-19 data by interacting with the map.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [udayladhi@gmail.com](mailto:udayladhi@gmail.com).
