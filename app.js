const loadData = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, dataLimit);
};



const displayData = (data,dataLimit) => {
  
   if (dataLimit && data.length >= 10) {
     data = data.slice(0, dataLimit);
     showAllBtn.classList.remove("hidden");
   } else {
     showAllBtn.classList.add("hidden");
   }


 
    const message = document.getElementById('message');
  const cardContainer = document.getElementById("card__container");

  data.length <= 0 ? message.classList.remove('hidden') : message.classList.add('hidden');

  cardContainer.innerText = "";
  data.forEach((item) => {

      const card = document.createElement("div");

    card.innerHTML = `
       <div class="card card-compact bg-base-100 shadow-xl p-6">
            <figure class="bg-slate-100 p-4 max-w-full object-cover"><img src="${item.image}" alt="Shoes" class="w-full scale-95 hover:scale-100 transition"/></figure>

            <div class="card-body">
            <h2 class="card-title">${item.brand}</h2>
            <p>${item.phone_name}</p>
            <div class="card-actions justify-end">
            
             <label onclick="showDetails('${item.slug}')" for="my-modal-3" class="btn w-full btn-success text-white">See Details</label>

        </div>
    </div>
</div>
        `;

    cardContainer.appendChild(card);
  });

  toggleSpinner(false)
};


// ============= GET SEARCH BUTTON ===============
const searchBtn = document.getElementById('search__btn');

searchBtn.addEventListener('click',()=>{
   searchProcess(10)
})


const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner');

  if(isLoading){
    spinner.classList.remove('hidden')
  }else{
    spinner.classList.add('hidden')
  }
}





const showAllBtn = document.getElementById("show__all");

showAllBtn.addEventListener("click", () => {

  searchProcess()
 
});

const searchProcess = (dataLimit)=>{
     toggleSpinner(true);
     const inputField = document.getElementById("input__field");
     const searchText = inputField.value;

    //  inputValue <= 0 ? loadData("phone") : loadData(inputValue, dataLimit);
     loadData(searchText, dataLimit);

     if(searchText.length === 0){
      loadData("phone");
     }
}


loadData("phone");




// ============================

const showDetails =async (id) => {
   const url = `https://openapi.programming-hero.com/api/phone/${id}`
   
   const res = await fetch(url);
   const data = await res.json();

   displayPhoneDetails(data.data)
}


const displayPhoneDetails = (data) => {
  const title = document.getElementById('phone__title');
  const subTitle = document.getElementById("phone__subtitle");
  const phoneThumb = document.getElementById("phone__thumb");
  title.textContent = data.name;
  subTitle.innerHTML = `
    <p class="font-semibold">Release Date: ${data.releaseDate ? data.releaseDate:"No Release Date Found"}</p>
  `
  phoneThumb.src = data.image;
  console.log(data);
}