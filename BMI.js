const button = document.getElementById("btn");
const results = document.getElementById("results");

button.addEventListener("click", function () {
  const select = document.getElementById("unit_system");
  const input_weight = document.getElementById("weight").value;
  const input_height = document.getElementById("height").value;
  results.innerHTML = "";

  let result = document.createElement("p");
  let metric = select.selectedIndex === 0;
  let BMI = calculateBMI(input_height, input_weight, metric).toFixed(2);
  let weightUnit = metric ? "kg": "lbs";

  if (BMI >= 40) {
    result.innerText = BMI + " " + "Extremely obese. \nYou are " + (input_weight - marginWeight(input_height, 40, metric)) +  " " + weightUnit + " away from being obese.";
    result.classList.add("extremely-obese");
  } else if (BMI < 40 && BMI >= 30) {
    result.innerText = BMI + " " + "Obese. \nYou are " + (marginWeight(input_height, 40, metric) - input_weight) +  " " + weightUnit + " away from being extremely obese and " + (input_weight - marginWeight(input_height, 30, metric)) +  " " + weightUnit + "  from being overweight.";
    result.classList.add("obese");
  } else if (BMI < 30 && BMI >= 25) {
    result.innerText = BMI + " " + "Overweight \nYou are " + (marginWeight(input_height, 30, metric) - input_weight) +  " " + weightUnit + " away from being obese and " + (input_weight - marginWeight(input_height, 25, metric)) +  " " + weightUnit + "  from being healthy.";
    result.classList.add("overweight");
  } else if (BMI < 25 && BMI >= 18) {
    result.innerText = BMI + " " + "Healthy. \nYou are " + (marginWeight(input_height, 25, metric) - input_weight) + " " + weightUnit + " away from being overweight and " + (input_weight - marginWeight(input_height, 18, metric)) +  " " + weightUnit + "  from being underweight.";
    result.classList.add("healthy");
  } else {
    result.innerText = BMI + " " + "Underweight. \nYou need to gain " + (marginWeight(input_height, 18, metric) - input_weight) +  " " + weightUnit + " to reach a healthy weight.";
    result.classList.add("underweight");
  }

  results.appendChild(result);
});

function calculateBMI(input_height, input_weight, metric) {
  if (metric) return input_weight / (input_height * input_height);
  return (703 * input_weight) / (input_height * input_height);
}

function marginWeight(input_height, bmiValue, metric) {
    if (metric) return (bmiValue * (input_height * input_height)).toFixed(2);
    return (((bmiValue * (input_height * input_height)))/703).toFixed(2);
}