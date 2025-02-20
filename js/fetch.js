fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {
    localStorage.setItem("catsData", JSON.stringify(cats))    
  }) 

  fetch('../json/feedbacks.json')
  .then(response => response.json())
  .then(feedbacks => {
    localStorage.setItem("feedbackData", JSON.stringify(feedbacks))    
  }) 