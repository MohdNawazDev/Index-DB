console.log(indexedDB);

//Tables are store object in the index db those are made in onUpgraded needed



//step1: opening a database 
let openDBReq = indexedDB.open("StudentDb", 3); 
console.log('--------',openDBReq);

// In opendb we have theree important method that is onsucces, onupgradended and ready state 


//always executed   -- 
// Data Insertion into index db
openDBReq.onsuccess = (e) => {
    console.log("Success needed");
    // transaction is set up process which represents all our process completed and we can acces those resource 
    let db = openDBReq.result; 
    let transaction = db.transaction("Student Table", "readwrite");
    let storeObject = transaction.objectStore("Student Table");


    // let request = storeObject.add({
    //     id: 2, 
    //     name: "Mohd Nawaz",
    //     email: "nawazi@gmail.com"
    // })

    // let request = storeObject.put({
    //     id: 3, 
    //     name: "efgi",
    //     email: "efgi@gmail.com"
    // })


    let objectStore = transaction.objectStore("Student Table")
    let delteThree = objectStore.delete(4);

    // we can specify the range in this
    // let request = storeObject.get(1); 
    // let request = storeObject.getAll(IDBKeyRange.bound(1, 2)); 
    // let request = storeObject.getAllKeys();

    //create a index 
    // let index = storeObject.index("name")
    // let request = index.get("Mohd Nawaz")
    console.log(delteThree);


    //delete 

    // let request = storeObject.delete("abc");

    delteThree.onsuccess = (e) => {
        console.log('------', e.target.result);
       
    }

    delteThree.onerror = (e) => {
        console.log('-----', e.target.error);
        
    }



    //for update we can use the put method 


    //WE generally used this method for iteration 

    // let request = storeObject.openCursor();

    // request.onsuccess = (e) => {
    //     let cursor = request.result;
    //     console.log("iteration");
        
    //     if(cursor){
    //         let {key, value} = cursor;
    //         console.log(key, value);
    //         cursor.continue();
    //     }

    // }
    


}


// this will work first time when we created the database or otherwise we launch the new version of database 
openDBReq.onupgradeneeded = (e) => {
    console.log("Upgraded needed");

    let db = openDBReq.result;
    if(!db.objectStoreNames.contains("Student Table")){
        let request = db.createObjectStore("Student Table", {keyPath: "id"}); //in keypath we provide id that is primary key
        request.createIndex("name", "name", {unique: false}); //with keyIndex we can create columns 
        request.createIndex("email", "email", {unique: true});
    }
}

openDBReq.onerror = (e) => {
    console.log("Error in the db");
}



