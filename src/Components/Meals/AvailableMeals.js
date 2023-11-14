import { useEffect, useState } from 'react'

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import { ColorRing } from 'react-loader-spinner'

const AvailableMeals = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [meals, setMeals] = useState([])
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-backend-251k.onrender.com')

      if (!response.ok) {
        setIsLoading(false)
        setHasError(true)
      }

      const responseData = await response.json()
      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key]._id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      console.log(loadedMeals)
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    try {
      fetchMeals()
    } catch (error) {}
  }, [])

  if (isLoading) {
    return (
      <section style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}}>
        <ColorRing
          visible={true}
          height='80'
          width='80'
          ariaLabel='blocks-loading'
          wrapperStyle={{}}
          wrapperClass='blocks-wrapper'
          colors={['green', 'green', 'green', 'green', 'green']}
        />
      </section>
    )
  }
  if (hasError) {
    return (
      <section>
        <p>....Something went wrong</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      item={meal}
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}
export default AvailableMeals
