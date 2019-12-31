# UPMC-ProviderSearch-Scroll
This is a demo of a scroll functionality for UPMC Provider Search. It was created for the sole purpose of handing off specs to developers at UPMC Health Plan. **The data pulled from this repo is local to the project and does not accurately reflect the data shown in https://findcare.upmchp.com/find.** 

To view a live demo of this code, please visit: https://www.christopherfrydryck.cf/UPMC-ProviderSearch-Scroll/.  

![Provider Search UI Redesign](https://www.christopherfrydryck.cf/img/ProviderSearchRedesign.png)

## Cloning and Manipulating Data 
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


## Number of results
By default, our work showcases a maximum of 20 results to a page. I will update this code later to be more modular and reflect whatever number of results you want on the page.  This is currently dictated heavily by the `dataInitialize` function and pagination functions in `index.js`. 


## Filtering
Because this is a prototype, it is not actually hooked up to a backend server at all, hence we are not doing any server side SQL calls for data or using a NoSQL database like Firebase.  Therefore, we are 'faux filtering' data using only one of the filtering options:  Accepting New Patients.  We chose this filter because it is very important to users, and is reflected in desktop, tablet and mobile designs.  It is also a toggle filter, hence no additional sub menu is used for this filter, making the process easier than ever.  As of now, the filtering is taking place as an argument in the `dataInitalize` function as such: 
```
dataInitalize(0, 20, true)
```
This function has three arguments. The first two define the results to be shown on the page (results 0 - 19 will be shown from `ProviderData.json`) and the final argument is optional and can be omitted.  If it is true, it will mean that we are filtering by if our provider is accepting new patients (as seen above in the code block showcasing our JSON format. For a further reference on how this is done, you can find it under `index.js`>`function dataInitalize(start, end, ANPFilt)`>`limitedFullArray = myJson.filter((x, i) => x.acceptingNewPatients == true);`.  This `LimitedFullArray` is a modified version of what is exported from `ProviderData.json`, and in the instance we are not passing our third argument to filter the results by Accepting New Patients, our `LimitedFullArray` is the same as the `ProviderData.json` file.



###### This code was written and organized by Christopher Frydryck for UPMC Health Plan.
