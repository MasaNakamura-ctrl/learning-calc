const Zero = "0";

const Dot = ".";

const Minus = "-";

const Head = 0;

const After_Head = 1;

const After_Minus = 2;

const Tail = -1;

const Before_Tail = -2;

const Abs = -1;

const AC = "AC";

const PlusMinus = "+/-";

const Equal = "=";

function get_display_element(){
    return document.querySelector('input[name="display"]')
}

function read_display(){
    return get_display_element().value;
}

function read_btn(btn){
    const button_value = btn.value;
    return button_value;
}

function result_display(value){
    get_display_element().value = value;
}

function operand_list(){
    const operands = ['+', '-', '×', '÷', '%'];
    return operands;
}

function operand_replace(display){
    return display.replace(/×/g, '*').replace(/÷/g, '/');
}

function value_is_stg(value, stg){
    return value === stg;
}

function num_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    if (value_is_stg(display, Zero)){
        display = button_value;
    }else{
        display += button_value;
    }
    result_display(display);
}

function display_without_stg(display, stg){
    return !display.includes(stg);
}

function dot_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    if (display_without_stg(display, Dot)){
        display += button_value;
    }
    result_display(display);
}

function ac_clicked(){
    result_display(Zero);
}

function stg_is_in_list(stg, list){
    return stg.includes(list);
}

function operation_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    const display_tail = display.slice(Tail);
    const operands = operand_list();
    if(!operands.includes(display_tail)){
        display += button_value;
    }else if((value_is_stg(button_value, Minus))&&(stg_is_in_list(operands.slice(After_Minus), display_tail))){
        display += button_value;
    }else if((!value_is_stg(button_value, Minus))&&(value_is_stg(display_tail, Minus))
        &&(stg_is_in_list(operands, display.slice(Before_Tail,Tail)))){
        display = display.slice(Head, Tail);
    }else{
        display = display.slice(Head, Tail) + button_value;
    }
    result_display(display);
}

function equal_clicked(){
    let display = read_display();
    const display_tail = display.slice(Tail);
    const operands = operand_list();
    let display_calc = display;
    if(operands.includes(display_tail)){
        display_calc = operand_replace(display.slice(Head, Tail));
    }else{
        display_calc = operand_replace(display);
    }
    result_display(eval(display_calc));
}

const operands = /\+|\-|\×|\÷|\%/;

function operand_test(operands, display){
    operands.test(display);
}

function abs_clicked(){
    let display = read_display();
    const display_head = display.slice(Head, After_Head);
    if (operand_test(operands, display)) {
        if(value_is_stg(display_head, Minus)){
            display = eval(display) * Abs;
        }
    }else{
        display = eval(display) * Abs;
    }
    result_display(display);
}

window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('input[type="button"]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            if (!isNaN(value) || value === '0') {
                num_clicked(button);
            } else if (value === Dot) {
                dot_clicked(button);
            } else if (value === AC) {
                ac_clicked();
            } else if (value === PlusMinus) {
                abs_clicked();
            } else if (value === Equal) {
                equal_clicked();
            } else {
                operation_clicked(button);
            }
        });
    });
});