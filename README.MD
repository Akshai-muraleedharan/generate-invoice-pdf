# Invoice PDF Create


The Express + PDFKit + Mongoose flow works as follows: A POST request sends invoice details (shop, customer, items, GST). The backend saves this data in MongoDB, then instantly generates and returns a PDF using PDFKit. The response streams the PDF to the browser without saving it on the server. Later, a GET request using the invoice ID fetches the same invoice from MongoDB and regenerates its PDF dynamically for download or inline viewing, ensuring accurate and consistent invoices.



------


## Features

- Create invoices via POST request with shop, customer, and product details.
- Automatically generate professional PDFs using PDFKit.
- Save invoice data securely in MongoDB for future access.
- Retrieve and regenerate invoices anytime using their unique ID.
- Dynamic GST and total amount calculation.
- Stream PDF directly to the browser (inline or download).


-------

## Folder structure

 Project/ <br/>
|- dist/<br/>
 |- (compiled javascript files)<br/>
|- src/<br/>
 |- config/<br/>
 |- controllers/<br/>
 |- interfaces/<br/>
 |- middleware/<br/>
 |- models/<br/>
 |- routes/<br/>
 |- staticDatas/<br/>
 |- utils/<br/>
 |- index.ts<br/>
 |- swagger.ts<br/>
|- .env<br/>
|- tsconfig.json<br/>


------


## Installation and setup

### Clone and repositry
```bash
git clone https://github.com/Akshai-muraleedharan/generate-invoice-pdf.git
cd project


```

### Install Dependencies

```bash

npm install

```


### Create ***.env*** file 

Add your configuration details:

```ini

PORT=4006
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopInvoice

```
------

## Build and Run

 ### Development Mode
  ``` bash

  npm run dev

  ```


 ### Build TypeScript to JavaScript

  ``` bash

    npm run build
  ```

  This will compile TypeScript files from the src/ folder into the dist/ folder.



### Start Production Server

``` bash

npm run start

```

This runs the compiled JavaScript files from dist/.

-------



## API Endpoints

| Method | Endpoint              | Description                           |
| ------ | ----------------------| --------------------------------------|
| POST   | `/api/v1/invoice`     | Create a new invoice and generate pdf |
| GET    | `/api/v1/invoice/:id` | Get invoice with id  and generate pdf |



## AUTHOR

**Akshai Muraleedharan**<br/>
**[GitHub](https://github.com/Akshai-muraleedharan/)**<br/>


-----

## License

This project is licensed under the MIT License.
