# UPMC-ProviderSearch-Scroll
This is a demo of a scroll functionality for UPMC Provider Search. It was created for the sole purpose of handing off specs to developers at UPMC Health Plan. **The data pulled from this repo is local to the project and does not accurately reflect the data shown in https://findcare.upmchp.com/find.** 

To view a live demo of this code, please visit: https://www.christopherfrydryck.cf/UPMC-ProviderSearch-Scroll/.  

![Provider Search UI Redesign](https://www.christopherfrydryck.cf/img/ProviderSearchRedesign.png)

## Requirement Specs for IT:
### Filters
##### Types of Filters
* Boolean Filter (True/False)(includes Accepting New Patients and Handicap Accessible)
* Dropdown Filters (includes Affiliated Hospital, Open Time, Network Accepted and More)
  * For dropdowns, use the same style for all dropdown filters as the more filter.
  * When the dropdown is open, if the user clicks outside of the containing box, it will close the dropdown filter . This action does not automatically apply the filters.  Dropdown filters will feature a Apply button at the bottom that will add the pill to the filters.
> NOTE: When a user clicks on a filter, show two new changes. First, a new active state for the filter and also a pill below showcasing the filter is active and can be removed. Use the filter value in the pill (IE: someone chooses a language filter of "Arabic" so the pill with read "Arabic" not "Language"

##### Conditional Filter Notes
> "Filters will be in conjunction with results: Ex) IF there are only English & Spanish speaking providers found back in results, ONLY those filters will show"
* If language is not available in the result list (aka does not apply), THEN it will appear grayed out but still visible
  * Service calls pending. This may be a future enhancement because we would need to requery all results, not just the max 100 results that display in the UI.
* If the filter does not apply to what is being searched for (location vs. provider filters) THEN do not show filter: Ex) gender does not apply to location filters, so do not show it (same as what we are currently doing)
* If a user updates their search options, THEN filters should update: Ex) current list does not show French speaking language, but after updated it will appear as not grayed out but available to be refined by

##### Gender Filter Specifics
* Both, Male or Female display
* Should be radio buttons and the default value is both.  This way we are not limiting results by default and require that one must be selected

##### Ways to Undo/Cancel a Filter
* Click on the filter again
* Click the "X" in the pill that is affiliated with the filter
* Click "Clear All" pill (will clear all filters instead of specific filter)

##### Additional Info
* Warnings and Error messages will be displayed within the view of the cards.  An example can be found [here](https://zpl.io/aMN6zEN).
* Upon going deeper into the experience at the location specialty level, back to results and the native back button in the browser will return to results with the filters still applied (Apply filters at the URL level)
* Warning messages for OOA are currently in review by marketing. Hold on adding content to messaging.
* Levels are to be added. This will use the Orchid tab component.

##### Questions:
* For the top level search (IE: I'm searching for an Optometrist within 5 miles of Wexford, PA), are we going to replace the location with Zip, full address, county, etc?  This is a question for split zip counties and issues that may arise with the Google Place API call.


## Code Notes for Dev

### Cloning and Manipulating Data 
In order to deviate from the demo link above, please feel free to download/clone this repo.  You can find the data shown in JSON format under `ProviderData.json`.  Here the structure looks like:

```
...{
      "_id": "5e0a1a721f0799886cd2cdaf",
      "firstName": "Mallory",
      "lastName": "Goodwin",
      "name": "Mallory Goodwin",
      "practice": "Alliance Family Practice",
      "address": "599 Pooles Lane <br/> Pittsburgh, PA 15219",
      "phone": "(412) 539-8715",
      "distance": 3.3,
      "acceptingNewPatients": true
    }...
```
All of this data is fake, and does not reflect any active UPMC providers, employees or doctors.  You can make your own fake data at https://www.json-generator.com/#.


### Number of results
By default, our work showcases a maximum of 20 results to a page. I will update this code later to be more modular and reflect whatever number of results you want on the page.  This is currently dictated heavily by the `dataInitialize` function and pagination functions in `index.js`. 


### Filtering
Because this is a prototype, it is not actually hooked up to a backend server at all, hence we are not doing any server side SQL calls for data or using a NoSQL database like Firebase.  Therefore, we are 'faux filtering' data using only one of the filtering options:  Accepting New Patients.  We chose this filter because it is very important to users, and is reflected in desktop, tablet and mobile designs.  It is also a toggle filter, hence no additional sub menu is used for this filter, making the process easier than ever.  As of now, the filtering is taking place as an argument in the `dataInitalize` function as such: 
```
dataInitalize(0, 20, true)
```
This function has three arguments. The first two define the results to be shown on the page (results 0 - 19 will be shown from `ProviderData.json`) and the final argument is optional and can be omitted.  If it is true, it will mean that we are filtering by if our provider is accepting new patients (as seen above in the code block showcasing our JSON format. For a further reference on how this is done, you can find it under `index.js`>`function dataInitalize(start, end, ANPFilt)`>`limitedFullArray = myJson.filter((x, i) => x.acceptingNewPatients == true);`.  This `LimitedFullArray` is a modified version of what is exported from `ProviderData.json`, and in the instance we are not passing our third argument to filter the results by Accepting New Patients, our `LimitedFullArray` is the same as the `ProviderData.json` file.



###### This code was written and organized by Christopher Frydryck for UPMC Health Plan.
