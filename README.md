# AWS-Serverless-Web-App

**Prerequisites ----------------------------------------------------------------------**
Ensure you have the following installed on your system:

Node.js (Download from nodejs.org)
npm (Node Package Manager, comes with Node.js)


Clone the repository
git clone https://github.com/your-username/AWS-Serverless-Web-App.git
cd AWS-Serverless-Web-App

Install required dependencies
npm install
This will install all dependencies listed in package.json. If node_modules/ is missing, it will be generated.

**AWS Deployment --------------------------------------------------------------------**

*Created an S3 bucket and enabled static website hosting.
 Uploaded the frontend files (index.html, app.js, style.css) stored in public folder.
 Configured the bucket policy to allow public access to the website.

*Create a lambda function and upload a zip of all files except public folder
 Assigne the necessary permission to Lambda in turms of Dynamo DB and Application Gateway

*Create a Dynamo DB

*Created an API Gateway and defined routes (/todos for GET and POST, /todos/{id} for DELETE).
 Integrated these routes with the respective Lambda functions.
 Deployed the API and obtained an Invoke URL to use in the frontend.

*Start your application : 
 npm start
** By default, the server runs on http://localhost:3000/.**

**Note : Make changes in public/app.js with "const API_URL = <API>"**
