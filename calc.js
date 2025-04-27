const Zero = "0";

const Dot = ".";

const Minus = "-";

const Head = 0;

const After_Head = 1;

const After_Second = 2;

const Tail = -1;

const Before_Tail = -2;

const Abs = -1;

const Operand_Tests = /\+|\-|\×|\÷|\%/;

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

function operation_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    const display_tail = display.slice(Tail);
    const operands = operand_list();
    if(!operand_list().includes(display_tail)){
        result_display(display + button_value);
    }else if((value_is_stg(button_value, Minus))&&(operands.slice(After_Second).includes(display_tail))){
        result_display(display + button_value);
    }else if((!value_is_stg(button_value, Minus))&&(value_is_stg(display_tail, Minus))
        &&(operands.includes(display.slice(Before_Tail,Tail)))){
        result_display(display.slice(Head, Tail))
    }else{
        result_display(display.slice(Head, Tail) + button_value);
    }
}

function equal_clicked(){
    const display = read_display();
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

function abs_clicked(){
    const display = read_display();
    if (Operand_Tests.test(display)) {
        const display_head = display.slice(Head, After_Head);
        if(value_is_stg(display_head, Minus)){
            result_display(eval(display) * Abs);
        }else{
            result_display(display);
        }
    }else{
        result_display(eval(display) * Abs);
    }
}