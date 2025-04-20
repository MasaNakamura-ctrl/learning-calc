function num_clicked(btn){
    const display = document.querySelector('input[name="display"]');
    if (display.value === "0"){
        display.value = btn.value;
    }else{
        display.value += btn.value;
    }
}

function dot_clicked(btn){
    const display = document.querySelector('input[name="display"]');
    const result = display.value.includes('.');
    if (!result){
        display.value += btn.value;
    }
}

function ac_clicked(){
    const display = document.querySelector('input[name="display"]');
    display.value = "0";
}

function operation_clicked(btn){
    const display = document.querySelector('input[name="display"]');
    const display_tail = display.value.slice(-1);
    const operations = ['+', '-', '×', '÷', '%'];
    if(!operations.includes(display_tail)){
        display.value += btn.value;
    }else{
        display.value = display.value.slice(0, -1) + btn.value;
    }
}

function equal_clicked(){
    const display = document.querySelector('input[name="display"]');
    const display_calc = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    const display_result = eval(display_calc);
    display.value = display_result;
}