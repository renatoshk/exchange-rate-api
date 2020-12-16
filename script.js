const currencyOne = document.getElementById('currency-one');
const ammountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const ammountTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swapButton = document.getElementById('swap');

//Fetch exchange rates and update DOM
function calculate (){
	   //marrim vleren qe kemi selektuar tek rate 1
       const currencyOneValue = currencyOne.value;
	   //marrim vleren qe kemi selektuar tek rate 2
       const currencyTwoValue = currencyTwo.value;
       //marrim data nga API ku path do kete vleren e pare dynamice ne baze te selektimit tone
       fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
             .then(res  => res.json())
             .then(data  => {
             	//merr vleren e rates
                const rate = data.rates[currencyTwoValue];
                //shfaq vleren e rates per vleren 1 te selectuar 
                rateElement.innerText = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;
                //shfaq tek currency 2, vleren e ndryshuar ne baze te selektimit te currency te pare
                ammountTwo.value = (ammountOne.value * rate).toFixed(2);
             });
}
//eventListeners
currencyOne.addEventListener('change', calculate);
ammountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
ammountTwo.addEventListener('input', calculate);
//event listener for swap button
swap.addEventListener('click',() => {
     const temp = currencyOne.value;
     currencyOne.value = currencyTwo.value;
     currencyTwo.value = temp;
     calculate();
});
calculate();