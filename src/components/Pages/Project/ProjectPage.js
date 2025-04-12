import './Project.scss'

const ProjectPage = () => {
  return(
    <div className='ms-4 mt-4 text-start' >
    
          <ul className=''>
            <li className=''>Project Part A: Basics (70%)</li>
          </ul>
          
        

        <div>

        </div>

For this project, you will create the CRUD functionality for an inventory system. You will build the following functionality:

Categories - you will require the category name (and id which will be managed via an auto incrementing primary key). Build the CRUD functionality to manage categories
Items = you will be required to store the category_id, title, description, price, quantity, and sku. Category must appear as a drop-down selection for the user. Build the CRUD functionality to manage items
Storefront = Build a storefront page for your site. Include a banner image and list of your items in a grid layout (Title, Category, Description, Price).
Use react router to load the content for each of the 3 pages described above.

IMPORTANT = The project MUST BE CODED in the style of the project prep 2025 example covered in class. Deviations from this coding style will result in the project not being corrected! The usual minimum of 5 major git commits is required for the project to be eligible to be marked.

    
     
Project Part B: Generative AI Project improvement (30%)

Clone the completed project from Part A into a new repository. For this part of the project, you are permitted to use a Generative AI of your choice to make the following improvements to your project:

Add image CRUD functionality (upload, replace, delete image). Modify the item grid display on the storefront with the added image.
Replace the single banner on the storefront page with a slideshow of banner images
Add user authentication to protect the Category and Item management pages
    </div>
  ); 
}

export default ProjectPage;