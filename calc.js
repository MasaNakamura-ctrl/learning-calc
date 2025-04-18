function num_clicked(btn){
    const display = document.querySelector('input[name="display"]');
    if (display.value === "0"){
        display.value = btn.value
    }else{
        display.value += btn.value
    }
}

function dot_clicked(btn){
    const display = document.querySelector('input[name="display"]');
    const result = display.value.includes('.');
    if (!result){
        display.value += btn.value
    }
}