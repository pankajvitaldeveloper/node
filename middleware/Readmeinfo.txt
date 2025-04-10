
below code of step how to upload image and step 
=>model schema add of image
=>middleware => for => upload logic
=>productRoutes make api for upload and update (inser, update)
=>api use in index 



I've made several important changes to handle file uploads properly:
1 Added Multer Configuration:
Created a middleware for handling file uploads
Set up file storage in the uploads directory
Added file type filtering (only images allowed)
Set a 5MB file size limit

2 Updated Product Model:
Added an image field to store the image path

3 Updated Routes:
Modified create and update routes to handle file uploads
Added proper error handling
Added 404 responses for not found cases
Improved the search functionality

4 Added Static File Serving:
Set up Express to serve files from the uploads directory



1 Now you can:
Create a product with an image:

POST http://localhost:3000/api/products/create
Content-Type: multipart/form-data

below code for testing in postman
name: "Product Name"
email: "product@example.com"
number: 123
image: [your image file]


Update a product with an image:

PUT http://localhost:3000/api/products/update/:id
Content-Type: multipart/form-data

name: "Updated Name"
image: [your image file]

The images will be stored in the uploads directory and will be accessible via URLs like:

http://localhost:3000/uploads/filename.jpg


Try uploading an image again, and it should work now. Make sure to:
Use multipart/form-data as the content type
Name your file field "image" in the form
Send the file along with other product data