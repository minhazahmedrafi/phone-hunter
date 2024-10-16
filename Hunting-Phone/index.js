const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phoneContainer");
  phoneContainer.textContent = "";
  const showContainer = document.getElementById("showContainer");
  const dataFound = document.getElementById("dataFound");
  if (phones.length === 0) {
    dataFound.classList.remove("hidden");
  }
  if (phones.length > 12 && !isShowAll) {
    showContainer.classList.remove("hidden");
  } else {
    showContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 w-96 shadow-xl my-4 p-4`;
    phoneCard.innerHTML = `<figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.slug}</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("phoneName");
  phoneName.innerText = phone.name;

  const showDetaislContainer = document.getElementById("showDetaislContainer");
  showDetaislContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
    <p><span>Storage: ${phone?.mainFeatures?.storage}</span></p>
 <p><span>Chipset: ${phone?.mainFeatures?.chipSet}</span></p>
 <p><span>Release Date: ${phone?.releaseDate}</span></p>

  
  `;
  console.log(phone);

  my_modal_5.showModal();
};

// heander search
const heandleSearch = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// const heandleSearch2 = () => {
//   loadingSpinner(true);
//   const searchField2 = document.getElementById("searchField2");
//   const searchText2 = searchField2.value;
//   loadPhone(searchText2);
// };

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const heandleShowAll = () => {
  heandleSearch(true);
};
