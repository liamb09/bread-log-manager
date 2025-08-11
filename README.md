# bread-log-manager

This web app makes it easy to add entries to your bread log without formatting them each time. I use it from my phone to make the process faster and more convenient.

## Setup
1. Create a Google Doc. Set the text styles as desired. (Only `Heading 1`, `Heading 2`, and `Normal Text` are used by the web app.)
2. Navigate to `Extensions > Apps Script`. A blank Apps Script project will open in a new tab. You can name the project in the top left.
3. Copy in the `Code.gs` file from this repo into the sample `Code.gs` file. Add an `index.html` file by clicking the + symbol at the top of the file list, adding `index.html`, and copying in the `index.html` file from this repo.
4. Navigate to `Deploy > New Deployment`. Add a new `Web App` deployment by clicking the gear near `Select type`. Add a description, such as `Bread Log Web App`, and configure permissions.
5. Hit the `Deploy` button, and give the app access to your account.
6. Now you should see a screen that allows you to copy the link to your web app.

## Use
### Recipe Entry
The app works by adding in placeholders for each section of the recipe, then filling them in as you add entries. To start, create a `Recipe Entry`:
1. Navigate to the deployment URL and make sure you have selected `Recipe Entry` in the entry dropdown (this is the default when you open the page).
2. To help identify the recipe entry when you add section entries later, enter the name and start date. You may also optionally include a description that will appear right under the recipe name heading (I like to use this for the recipe source).
3. Finally, fill in each section of the recipe that you plan to fill in later, on separate lines. For an example recipe, you may add sections for `Levain`, `Mix`, `Bulk Fermentation`, `Preshape & Bench Rest`, `Shape`, `Proof`, and `Bake`.

### Section Entry
Once you complete a section of the recipe, you can add in a `Section Entry`:
1. Navigate to the deployment URL and choose the `Section Entry` option from the entry dropdown.
2. To identify the recipe, enter the recipe name in the format `NAME MM/DD/YY`, where the date is the start date that you entered in the `recipe entry`. Make sure the month and day are represented by two digits (ex: `Pizza 08/02/25` for pizza started on August 2nd, 2025).
3. Optionally, add a subtitle that will appear under the section heading.
4. Add ingredients: if applicable, click the `Ingredients` checkbox. In the text box, enter your ingredients on separate lines in the format `INGREDIENT.MASSg`. For example: `Bread flour (12.7% protein).100g`.
5. Add steps: click the `Steps` checkbox and add steps on separate lines. You may also choose to `Add steps later`, which saves a placeholder in the document to add more steps in the future. This is useful for long steps like rising periods, where you may want to add steps at the beginning and at the end.
6. Add notes: click the `Notes` checkbox and enter any notes on separate lines. Similarly to adding steps, you may also choose to `Add notes later`.

### Extra Steps & Notes Entry
If you previously selected to add steps or notes later, you may do so here.
1. Just like for a `Section Entry`, enter the recipe name in the format `NAME MM/DD/YY` for identification.
2. Add any steps or notes on separate lines in the appropriate text boxes.
