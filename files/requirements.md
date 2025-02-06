# HTML

### Webpage Layout

Use "head" at the top of the document for meta data.

Use "header" to contain the header.

Use "body" to contain the main part of the webpage

* Use "section" to identify sections inside the body of the webpage.

* Use "containers" to identify different sub-sections of each section.

* Use "objects" relating to those containers to identify what content is going in each container.

Use "footer" to contain the footer.

All styles and scripts should be contained in their respective reference files. 

### Naming Conventions

Use the format "name_of_section" for sections

Use the format "name_of_section"-container for container elements

Use the format "name_of_section"-object for objects in containers

Use the same design language for naming other elements that may not fit in these categories.

### Header and Footer

There will be a header and footer for every page that should be the same, to keep this continuity, they should use the same stylesheet, referenced as "header-styles.css" and "footer-styles.css" respectively. The implementation of both the header and the footer should be the same accross all contained webpages.

# CSS

### CSS Formatting

The styles used for each class or id of element should be in the CSS file in the order that they are used in the HTML file.

There should be media query's at the end of the file to properly scale elements from desktop to mobile screen sizes. 

* We should agree on what pixel sizes imply a change in the scale.

# JS

The elements referenced should be easier to deal with because of our naming conventions, and should keep the same design language if creating new variables for exporting.