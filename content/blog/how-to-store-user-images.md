+++
date = "2017-03-23T22:25:43-07:00"
title = "How To Store User Images"

+++

- [Intro](/blog/how-to-store-user-images/#intro)
- [Ways of Storing Images](/blog/how-to-store-user-images/#ways-of-storing-images)
- [Demo](/blog/how-to-store-user-images/#demo)

## Introduction

You want your users to be able to upload images, profile pictures, receipts, and so on, but you are not sure where to
save it or how to do it. 

This is a short blog addressing this issue. I will talk about the different ways, but more importantly, link to a 
demo repo that walks through the process of uploading images using Amazon Services.

## Ways of storing images

There are many ways to approach it:

- File System
- DB (mysql, postgresql)
- Third party (AWS, Cloudinary) 

First off, you need a client to grab the image and send it to the client. Then, the server can parse the image
and store it. Storing it on your file system is a possibility but highly discouraged. It's difficult to guarantee
data consistency. The better way is using a database. The downside is memory space and managing images as blobs 
(Binary Large OBjectS).

I encourage using a third party such as [AWS S3](https://aws.amazon.com/s3/) or [Cloudinary](http://cloudinary.com/).
Using their API might take a second to learn but it saves time not worrying about missing or corrupted files, limited
server storage or parsing and displaying blobs.

## Demo

So how do you use a third party service like S3? [This demo](https://github.com/berto/s3-image-upload-demo) has a 
great readme and walks through the process using node. The concepts should easily transfer to other languages or 
cloud providers:

- Have the client grab the user image. e.g. using an input tag type upload.
- Send a post request to the server. You might be able to send it to a third party straight from the client,
but it's best to handle it with a server.
- Parse the image blob from the body. Look for a middleware to parse `multipart/form-data` content type.
- Post image to the third party using their API.
- Grab image id or address to reference. I recommend using a uuid.
- Store image id or address to your database to associate with the user.

![gopher](img/starcrafts_0.png)
