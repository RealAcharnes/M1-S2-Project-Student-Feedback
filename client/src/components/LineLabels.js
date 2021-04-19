//CREATE LABELS FOR LINE CHART 
const LineLabels = (integer) => { //integer is == groupArray.length
    let array = []
    switch(integer){
        case 1:
            array = ["1er quiz"];
            break;
        case 2:
            array = ["1er quiz", "2e quiz"];
            break;
        case 3:
            array = ["1er quiz", "2e quiz", "3e quiz"];
            break;
        case 4:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz"];
            break;
        case 5:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz"];
            break;
        case 6:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz"];
            break;
        case 7:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz"];
            break;
        case 8:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz"];
            break;
        case 9:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz"];
            break;
        case 10:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz"];
            break;
        case 11:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz", "11ème quiz"];
            break;
        case 12:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz", "11ème quiz", "12ème quiz"];
            break;
        case 13:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz", "11ème quiz", "12ème quiz", "13e quiz"];
            break;
        case 14:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz", "11ème quiz", "12ème quiz", "13e quiz", "14e quiz"];
            break;
        default:
            array = ["1er quiz", "2e quiz", "3e quiz", "4e quiz", "5e quiz", "6e quiz", "7e quiz", "8e quiz", "9e quiz", "10e quiz", "11ème quiz", "12ème quiz", "13e quiz", "14e quiz", "15e quiz"];
            break;
    }
    return array;
  }

  export default LineLabels;

