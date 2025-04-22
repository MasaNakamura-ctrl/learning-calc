const Zero = "0";

const Dot = "."

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

function num_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    if (display === Zero){
        result_display(button_value);
    }else{
        result_display(display + button_value);
    }
}

function dot_clicked(btn){
    let display = read_display();
    const button_value = read_btn(btn);
    const result = display.includes(Dot);
    if (!result){
        result_display(display + button_value);
    }
}

function ac_clicked(){
    result_display(Zero);
}

function operation_clicked(btn){
    let display = read_display();
    const display_tail = display.slice(-1);
    const button_value = read_btn(btn);
    const operands = operand_list();
    if(!operand_list().includes(display_tail)){
        result_display(display + button_value);
    }else if((button_value==='-')&&(operands.slice(2).includes(display_tail))){
        result_display(display + button_value);
    }else if((button_value!=='-')&&(display_tail==='-')&&(operands.includes(display.slice(-2,-1)))){
        result_display(display.slice(0, -1))
    }else{
        result_display(display.slice(0, -1) + button_value);
    }
}

function equal_clicked(){
    const display = read_display();
    const display_tail = display.slice(-1);
    const operands = operand_list();
    let display_calc = display;
    if(operands.includes(display_tail)){
        display_calc = operand_replace(display.slice(0, -1));
    }else{
        display_calc = operand_replace(display);
    }
    result_display(eval(display_calc));
}

function abs_clicked(){
    const display = read_display();
    if (/\+|\-|\×|\÷|\%/.test(display)) {
        const display_head = display.slice(0, 1);
        if(display_head==="-"){
            result_display(eval(display) * -1);
        }else{
            result_display(display);
        }
    }else{
        result_display(eval(display) * -1);
    }
}