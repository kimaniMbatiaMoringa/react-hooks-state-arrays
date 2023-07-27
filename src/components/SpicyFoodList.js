import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);//Sets the food array initially to store only what is in the spicy foods data file
  const [cuisine, setCuisine] = useState('All');

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods,newFood] //Copies the food array and also adds the newFood object to the end of that array (This is important if you want to copy an existing dataset,add a new element to it and display the dataset updated on the screen)
    setFoods(newFoodArray)                  //Resets the food variable  to match that of the newFoodArray, which includes the new spicyfood object
  }                                         //React will only re-render the component when the state has a new value

  function handleLiClick(id){
    const foodToBeRemoved = id                    //Set the id of the selected food to teh foodToBeRemoved variable
    const editedFoodArray = foods.filter(
      (food)=> food.id !==foodToBeRemoved         //Filter those foods with id's that do not match with the foodToBeRemoved
      )
    setFoods(editedFoodArray)                     //Now set the food array to contain only those that are included in the filter
  }

  function addSpiceLevel(id){                     //
    const newFoodArray = foods.map((food)=>{      //iterates through the array and returns
      if (food.id == id){                         //if the id of the food in the array matches the id of the food selected
        return {
          ...food,heatLevel : food.heatLevel + 1, //Copy that food object and Increment that food objects heat level by 1
        }
      }
      else{ return food}
      })

      setFoods(newFoodArray)
    };

    function selectCuisine(event){
      setCuisine(event.target.value)              //Sets the cuisine variable to the value of the option
      console.log(cuisine)
    }

    const foodsToDisplay = foods.filter((food)=>{
      if (cuisine == "All"){
        return true                               //Runs thi
      }
      else{
        return food.cuisine === cuisine           //Returns a new array of only those foods that have the cuisine property that matches the cuisine variable
      }
    })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={()=> addSpiceLevel(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>

      <select name="filter" onChange={selectCuisine}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
    
  );
}

export default SpicyFoodList;
