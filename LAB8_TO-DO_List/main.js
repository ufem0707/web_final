$(function(){
    $("[type='checkbox']").on("change", updateProgress);
});

function updateProgress() {
    let hasChecked = 0;
    const checkboxes = $("[type='checkbox']");
    for (let x = 0; x < checkboxes.length; x++) {
        if (checkboxes[x].checked) {
            hasChecked += 1;
        }
    }
    
    const progressBar = document.getElementById("progressBar");
    progressBar.max = checkboxes.length;
    progressBar.value = hasChecked;

    const meter = document.getElementById("meter");
    meter.max = checkboxes.length;
    meter.value = hasChecked;
}
