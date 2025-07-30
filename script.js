const mainSection = document.getElementById('main-section')
const formSection = document.getElementById('form-section')
const addBookmarkBtn = document.getElementById('add-bookmark-button')
const categoryDropdown = document.getElementById('category-dropdown')
const categoryList = document.getElementById('category-list')
const categoryName = document.querySelectorAll('.category-name')
const closeFormBtn = document.getElementById('close-form-button')
const addFormBookmark = document.getElementById('add-bookmark-button-form')
const formName = document.getElementById('name')
const formUrl = document.getElementById('url')
const bookmarkListSection = document.getElementById('bookmark-list-section')
const viewCategoryBtn = document.getElementById('view-category-button')
const closeListBtn = document.getElementById('close-list-button')
const deleteBookmarkBtn = document.getElementById('delete-bookmark-button')

 function getBookmarks() {
   try{
     const storedBookmarks =localStorage.getItem('bookmarks')
     const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : []
     if(Array.isArray(bookmarks) && bookmarks.every(item => item.name && item.category && item.url)){
       return bookmarks
     } else {
       return []
     }
   }
   catch (error){
    return []
   }
}
 
function displayOrCloseForm(){ 
  mainSection.classList.toggle("hidden")
  formSection.classList.toggle("hidden")
} 

addBookmarkBtn.addEventListener("click", ()=>{
  categoryName.forEach((catName) => catName.innerText = categoryDropdown.selectedOptions[0].text)
  displayOrCloseForm()})
 
closeFormBtn.addEventListener("click", displayOrCloseForm)

addFormBookmark.addEventListener("click", ()=>{
  let bookmarks = getBookmarks()
  if(!(formName.value || formUrl.value)){
    alert("Please fill the both inputs")
  }
  else{bookmarks.push({
    name:  formName.value,
    category: categoryDropdown.selectedOptions[0].value,
    url: formUrl.value 
  }
  ) 
localStorage.setItem("bookmarks", JSON.stringify(bookmarks))} 
formName.value = ""
formUrl.value = ''
displayOrCloseForm()
}) 
 
function displayOrHideCategory(){
  mainSection.classList.toggle("hidden")
  bookmarkListSection.classList.toggle('hidden')
}
    
viewCategoryBtn.addEventListener("click", ()=>{ 
  categoryList.innerHTML = ""
  displayOrHideCategory()
  categoryName.forEach((catName) => catName.innerText = categoryDropdown.selectedOptions[0].text)
const bookmarks = getBookmarks()
const bm = bookmarks.filter(({category})=> category === categoryDropdown.selectedOptions[0].value)
let found = ""
bm.forEach(({name, category, url})=>{ 
  found += `<div style="display: block"><input type="radio"  id="${name}" value="${name}" name="bookmark">
              <label for="${name}">
                <a href="${url}">${name}</a>
              </label></div>`
})

   bm.length !== 0 ? categoryList.innerHTML += found : categoryList.innerHTML += '<p>No Bookmarks Found</p>' 
})
   
closeListBtn.addEventListener("click", displayOrHideCategory)
deleteBookmarkBtn.addEventListener("click", () => {
  const bookmarks = getBookmarks()
  const selectedRadio = document.querySelector('input[type="radio"]:checked')

  if (!selectedRadio) {
    alert("Please select a bookmark to delete.")
    return
  }

  const selectedName = selectedRadio.value
  const selectedCategory = categoryDropdown.selectedOptions[0].value
 
  // Remove bookmark with matching name and category
  const updatedBookmarks = bookmarks.filter(bm => !(bm.name === selectedName && bm.category === selectedCategory))

  // Save updated list
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
  selectedRadio.parentElement.remove()

  const remainingRadios = document.querySelectorAll('input[type="radio"]')
  if (remainingRadios.length === 0) {
    categoryList.innerHTML = '<p>No Bookmarks Found</p>'
  }
})
