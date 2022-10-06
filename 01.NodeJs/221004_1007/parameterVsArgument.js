const func1 = call => {console.log(call)}; // call은 parameter

func('청춘'); // 청춘은 argument

// param = arg  left = right

const func2 = callback => { callback = ?; callback(); }
func2( (param1) => {console.log(param1);})