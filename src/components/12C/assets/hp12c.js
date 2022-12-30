// import React from 'react';
// import * as S from './styles';
// import { Link } from 'react-router-dom';

/*jslint browser:true, sub:true, white:false */
var PLATINUM = 0;

if (window["is_platinum"]) {
	PLATINUM = 1;
}

function badnumber(res) {
	return (isNaN(res) || ! isFinite(res));
}

function binary_sgn(val)
{
	return (val >= 0 ? 1 : -1);
}

function cl5_round(val, decs)
{
	if (decs > 11) {
		return val;
	}
	var scale = Math.pow(10, decs);
	return Math.round(Math.abs(val)*scale)/scale * binary_sgn(val);
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

// calculator non-volatile memory -----------------------------------------------------------

var x = 0;
var y = 0;
var z = 0;
var w = 0;
var last_x = 0;
var alg_op = 0;

var decimals = 2;
var decimal_point_is_comma = 0; 

var stomemory = [];
var ram = [];

var begin = 0;
var dmy = 0;
var compoundf = 0;
var finmemory = [];
var njmemory = [];

// volatile memory ---------------------------------------------------------------------

var algmode = 0;
var program_mode = 0;
var instruction_pointer = 0;
var pushed = 0;
var gtoxx = "";
var modifier = 0;
var do_fincalc = 0;
var xmode = -1;
var error_in_display = 0;

// algebraic operations

var ALG_PLUS = 1;
var ALG_MINUS = 2;
var ALG_MULTIPLY = 3;
var ALG_DIVIDE = 4;
var ALG_POWER = 5;

// internal code -----------------------------------------------------------------------

// financial constants
var FIN_N = 0;
var FIN_I = 1;
var FIN_PV = 2;
var FIN_PMT = 3;
var FIN_FV = 4;

var INTERPOLATION = 50;

// modifiers
var FF = 1;
var GG = 2;
var STO = 4;
var RCL = 8;
var STO2 = 16;
var RCL2 = 32;
var RCL_GG = 64;
var STO_PLUS = 128;
var STO_MINUS = 256;
var STO_TIMES = 512;
var STO_DIVIDE = 1024;
var GTO = 2048; 		// program typing mode only
var GTO_MOVE = 4096;		// program typing mode only

var STAT_N  = 1;
var STAT_X  = 2;
var STAT_X2 = 3;
var STAT_Y  = 4;
var STAT_Y2 = 5;
var STAT_XY = 6;

var INTERACTIVE = 0;
var PROGRAMMING = 1;
var RUNNING = 2;
var RUNNING_STEP = 3;

function clear_fin()
{
	for(var e = 0; e < 5; ++e) {
		finmemory[e] = 0;
	}
}

function clear_statistics()
{
	// statistics share memory with STO memory
	for (var e = 1; e <= 6; ++e) {
		stomemory[e] = 0;
	}
}

var ram_MAX = 100;
var ram_ADDR_SIZE = 2;
var GTO00 = "43.33.00";
var INSTRUCTION_SIZE = 2;

if (PLATINUM) {
	ram_MAX = 400;
	ram_ADDR_SIZE = 3;
	GTO00 = "43.33.000";
}

function clear_prog()
{
	ram[0] = "";
	for (var e = 1; e < ram_MAX; ++e) {
		ram[e] = GTO00;
	}
	instruction_pointer = 0;
}

var MEM_MAX = 20;

if (PLATINUM) {
	MEM_MAX = 30;
}

function clear_sto()
{
	for (var e = 0; e < MEM_MAX; ++e) {
		stomemory[e] = 0;
		njmemory[e] = 1; // position 0 is read-only and always returns 1.
	}
}

var display;
var pointer_div;
var dbegin;
var ddmyc;
var dmodifier;
var pgrm;
var rpnalg;

var lcd = [];
var has_lcd = 0;

var LCD_A = 1;
var LCD_B = 2;
var LCD_C = 4;
var LCD_D = 8;
var LCD_E = 16;
var LCD_F = 32;
var LCD_G = 64;
var LCD_P = 128;
var LCD_T = 256;

function zeropad(s, n)
{
	s = ""+s;
	while (s.length < n) {
		s = "0" + s;
	}
	return s;
}

function init_lcd()
{
	if (window['lcd_broken']) {
		return;
	}

	if (! document.getElementById("lcd0a")) {
		return;
	}

	has_lcd = 1;
	for(var e = 0; e <= 10; ++e) {
		lcd[e] = [];
		lcd[e][0] = 0;
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"a");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"b");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"c");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"d");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"e");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"f");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"g");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"p");
		lcd[e][lcd[e].length] = document.getElementById("lcd"+e+"t");
	}
}

var lcdmap = [];

lcdmap['0'] = LCD_A | LCD_B | LCD_C | LCD_E | LCD_F | LCD_G;
lcdmap['1'] = LCD_C | LCD_F;
lcdmap['2'] = LCD_A | LCD_C | LCD_D | LCD_E | LCD_G;
lcdmap['3'] = LCD_A | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap['4'] = LCD_B | LCD_C | LCD_D | LCD_F;
lcdmap['5'] = LCD_A | LCD_B | LCD_D | LCD_F | LCD_G;
lcdmap['6'] = LCD_A | LCD_B | LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap['7'] = LCD_A | LCD_C | LCD_F ;
lcdmap['8'] = LCD_A | LCD_B | LCD_C | LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap['9'] = LCD_A | LCD_B | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap[' '] = 0;
lcdmap['.'] = LCD_P;
lcdmap[','] = LCD_P | LCD_T;
lcdmap['r'] = LCD_A | LCD_B;
lcdmap['u'] = LCD_B | LCD_C | LCD_D;
lcdmap['n'] = LCD_B | LCD_C | LCD_A;
lcdmap['i'] = LCD_B;
lcdmap['g'] = LCD_A | LCD_B | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap['-'] = LCD_D;
lcdmap['E'] = LCD_A | LCD_B | LCD_D | LCD_E | LCD_G;
lcdmap['e'] = LCD_A | LCD_B | LCD_D | LCD_E | LCD_G;
lcdmap['O'] = LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap['R'] = LCD_D | LCD_E;

function lcd_display_digit(dgt, pos, merge)
{
	if (! lcdmap[dgt]) {
		dgt = ' ';
	}
	var map = lcdmap[dgt];
	var element = lcd[pos];
	var e; 
	var f = 1;
	for(e = 1; e < element.length; ++e) {
		element[e].style.visibility = (map & f) ? "visible" : 
					((merge && element[e].style.visibility == "visible") ? "visible" :"hidden");
		f <<= 1;
	}
}

function lcd_display(txt)
{
	var f = -1;
	for (var e = 0; e < txt.length && f < lcd.length; ++e) {
		var dgt = txt.charAt(e);
		++f;
		if (dgt == '.' || dgt == ',') {
			// merge decimal point/thousand separator
			--f;
			lcd_display_digit(dgt, f, 1);
		} else {
			lcd_display_digit(dgt, f, 0);
		}
	}
	for (++f; f < lcd.length; ++f) {
		lcd_display_digit(' ', f, 0);
	}
}

function lcd_clear()
{
	for (var e = 0; e < lcd.length; ++e) {
		for (var f = 1; f < lcd[e].length; ++f) {
			lcd[e][f].style.visibility = "hidden";
		}
	}
}

var instruction_table = "0123456789_-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var addr_prefix = "$";

function compress_opcode(op)
{
	var c_op = "";
	var opcodelist = op.split('.');
	for(var e = 0; e < opcodelist.length; ++e) {
		var opcode = opcodelist[e];
		var lopcode = opcode.length;
		var nopcode = parseInt(opcode, 10);
		if (lopcode === INSTRUCTION_SIZE && nopcode >= 0 && nopcode <= 49) {
			c_op += instruction_table.charAt(nopcode);
		} else if (lopcode === ram_ADDR_SIZE) {
			c_op += addr_prefix; 
			if (nopcode < 64) {
				c_op += instruction_table.charAt(nopcode);
			} else {
				c_op += instruction_table.charAt(Math.floor(nopcode / 64));
				c_op += instruction_table.charAt(nopcode % 64);
			}
		} else {
			// invalid instruction
			return compress_opcode(GTO00);
		}
	}
	return c_op;
}

function decompress_opcode(c_op)
{
	var op = "";
	var aop = [];
	var cc;
	var err = 0;
	var addr_mode = 0;
	var addr_value = 0;

	for(var e = 0; e < c_op.length; ++e) {
		cc = c_op.charAt(e);
		if (cc === addr_prefix) {
			if ((aop.length < 1) || (addr_mode > 0)) {
				err = 1;
				break;
			}
			addr_mode = 1;
			continue;
		}
		ncc = instruction_table.indexOf(cc);
		if (ncc < 0) {
			err = 1;
			break;
		}
		if (addr_mode) {
			addr_value = (addr_value * 64) + ncc;
			if (addr_value >= Math.pow(10, ram_ADDR_SIZE)) {
				err = 1;
				break;
			}
			if (addr_value >= ram_MAX) {
				err = 1;
				break;
			}
			if (addr_mode == 1) {
				aop.push(zeropad(addr_value, ram_ADDR_SIZE));
			} else {
				aop[aop.length - 1] = zeropad(addr_value, ram_ADDR_SIZE);
			}
			addr_mode += 1;
		} else {
			if (ncc > 49) {
				err = 1;
				break;
			}
			aop.push(zeropad(ncc, INSTRUCTION_SIZE));
		}
	}

	if (err) {
		op = GTO00;
	} else if (aop.length > 3 || aop.length < 1) { 
		op = GTO00;
	} else {
		op = aop.join('.');
	}

	return op;
}

function assert_compression()
{
	if (PLATINUM) {
		if (compress_opcode("43.33.000") != "Fv$0") {
			alert("Opcode 43.33.000 compression error: returning "+compress_opcode("43.33.000"));
			return;
		}
		if (compress_opcode("43.33.099") != "Fv$1x") {
			alert("Opcode 43.33.099 compression error: returning "+compress_opcode("43.33.099"));
			return;
		}
		if (decompress_opcode(compress_opcode("43.33.000")) != "43.33.000") {
			alert("Opcode 43.33.000 decompression error: returning "+decompress_opcode(compress_opcode("43.33.000")));
			return;
		}
		if (decompress_opcode(compress_opcode("43.33.099")) != "43.33.099") {
			alert("Opcode 43.33.099 decompression error: returning "+decompress_opcode(compress_opcode("43.33.099")));
			return;
		}
	} else {
		if (compress_opcode("43.33.00") != "Fv0") {
			alert("Opcode 43.33.00 compression error: returning '"+compress_opcode("43.33.00")+"'");
			return;
		}
		if (compress_opcode("43.33.99") != "Fv$1x") {
			alert("Opcode 43.33.99 compression error: returning "+compress_opcode("43.33.99"));
			return;
		}
		if (decompress_opcode(compress_opcode("43.33.00")) != "43.33.00") {
			alert("Opcode 43.33.00 decompression error: returning "+decompress_opcode(compress_opcode("43.33.00")));
			return;
		}
		if (decompress_opcode(compress_opcode("43.33.99")) != "43.33.99") {
			alert("Opcode 43.33.99 decompression error: returning "+decompress_opcode(compress_opcode("43.33.99")));
			return;
		}
	}
}

// assert_compression();

function marshal_array(a, type)
{
	var mtxt = "A"+type;

	for(var ex = 0; ex < a.length; ++ex) {
		data = a[ex];
		if (type == 'X') {
			data = compress_opcode(data);
		}
		mtxt += "!" + data;
	}

	return mtxt;
}

function unmarshal_array(dst_name, mtxt)
{
	if (mtxt.length < 2) {
		// can't be an encoded array, since it needs at least 'A' + type character
		return;
	}

	var dst = window[dst_name]; // must be already filled with 0s or anything
	var type = mtxt.charAt(1);
	mtxt = mtxt.slice(3);
	var a = mtxt.split('!');

	for (var ex = 0; ex < a.length && ex < dst.length; ++ex) {
		if (type == 'N') {
			dst[ex] = parseFloat(a[ex]);
			if (badnumber(dst[ex])) {
				dst[ex] = 0;
			}
		} else {
			// programming opcode
			if (ex > 0) {
				dst[ex] = decompress_opcode(a[ex]);
			}
		}
	}

	return;
}

function save_memory2()
{
	var expires = new Date();
	expires.setTime(expires.getTime() + 7*24*60*60*1000); // timezone irrelevant
	var sm ='hp12c'+(PLATINUM ? "pl" : "")+"="+
		"x:" + x + " " +
		"y:" + y + " " +
		"z:" + z + " " +
		"w:" + w + " " +
		"last_x:" + last_x + " " +
		"alg_op:" + alg_op + " " +
		"algmode:" + algmode + " " +
		"decimals:" + decimals + " " +
		"decimal_point_is_comma:" + decimal_point_is_comma + " " +
		"begin:" + begin + " " +
		"dmy:" + dmy + " " +
		"compoundf:" + compoundf + " " +
		"stomemory:" + marshal_array(stomemory, 'N') + " " + 
		"finmemory:" + marshal_array(finmemory, 'N') + " " + 
		"njmemory:" + marshal_array(njmemory, 'N') + " " + 
		"ram:" + marshal_array(ram, 'X') + " " + 
		"; expires=" + expires.toGMTString() + "; path=/";
	return sm;
}

function save_memory()
{
	document.cookie = save_memory2();
}

function recover_memory2(sserial)
{
	var ck = sserial.split(';'); // gets all cookie variables for this site

	for(var f = 0; f < ck.length; ++f) {
		var cv = ck[f].split('=');      // split cookie variable name and value
		if (cv.length != 2) {
			continue;
		}
		cv[0] = trim(cv[0]);
		cv[1] = trim(cv[1]);
		if (cv[0] != ('hp12c'+(PLATINUM ? "pl" : ""))) {
			continue;
		}
		var sm = cv[1].split(' '); 	// internal variable separation
		for (var e = 0; e < sm.length; ++e) {
			var smpair = sm[e].split(':');  // each internal variable is name=value

			if (smpair.length == 2 && window[smpair[0]] !== undefined) {
				if (smpair[1].length >= 2 && smpair[1].charAt(0) == 'A') {
					unmarshal_array(smpair[0], smpair[1]);
				} else {
					window[smpair[0]] = parseFloat(smpair[1]);
					if (badnumber(window[smpair[0]])) {
						window[smpair[0]] = 0;
					}
				}
			}
		}
	}
}

function recover_memory()
{
	recover_memory2(document.cookie); // gets all cookie variables for this site
}

function close_hp12c()
{
	if (! close_hp12c.done) {
		save_memory();
		close_hp12c.done = 1;
	}
}
close_hp12c.done = 0;

function show(txt)
{
	if (has_lcd) {
		lcd_display(txt);
	} else	{
		display.innerHTML = txt;
	}
}

var keyboard = 0; // keyboard is disabled to simulate long-running operations

function cli()
{
	keyboard = 0;
}

function sti()
{
	keyboard = 1;
}

var display_max = 9999999999;
var display_min = 0.0000000001;
var value_max = 9.9999999*Math.pow(10, 99);
var value_min = Math.pow(10, -99);
var display_digits = 11; // includes the decimal point character

function i18n(s)
{
	var dpos = s.indexOf('.');

	if (dpos == -1) {
		s += ".";
		dpos = s.length - 1;
	}

	if (decimal_point_is_comma) {
		s = s.slice(0, dpos) + ',' + s.slice(dpos+1);
	}

	var ts = decimal_point_is_comma ? "." : ",";

	for(var e = dpos - 3; e > 0 + (s.charAt(0) == '-' ? 1 : 0); e -= 3) {
		s = s.slice(0, e) + ts + s.slice(e);
	}

	return s;
}

function format_result(nu)
{
	var res = "";
	var absnu = Math.abs(nu);
	var show_dec = decimals;
	var power = absnu >= value_min ? Math.floor(Math.log(absnu)/Math.log(10)) : -9999;

	if (absnu > display_max) {
		// too big to be shown normally
		show_dec = 100;
	} else if (absnu >= value_min && power < -9) {
		// too small to be shown normally
		show_dec = 100;
	} else if (absnu >= value_min && show_dec < (-power)) {
		// we need more decimals to show this number
		show_dec = -power;
		
	}

	if (show_dec == 100) {
		// show as exponential
		if (absnu < value_min) {
			res = i18n('0');
		} else {
			var mantissa = nu / Math.pow(10, power);
			if (power < 0) {
				res = i18n(mantissa.toFixed(6))+"-"+zeropad((-power).toFixed(0), 2);
			} else {
				res = i18n(mantissa.toFixed(6))+" "+zeropad(power.toFixed(0), 2);
			}
		}
	} else {
		var dec = Math.max(0, show_dec);
		var ll = nu.toFixed(dec).length - (dec > 0 ? 1 : 0);
		if (ll > display_digits) {
			// reduce decimals if too big for display
			dec -= (ll - display_digits);
			dec = Math.max(0, dec);
		}
		res = i18n(nu.toFixed(dec));
	}
	return res;
}

function displayX3()
{
	if (isNaN(x)) {
		x = 0;
	} else if (x > value_max) {
		x = value_max;
	} else if (x < -value_max) {
		x = -value_max;
	} else if (Math.abs(x) < value_min) {
		x = 0;
	}
	if (xmode < 0) {
		// display result
		var sres = format_result(x);
		show(sres);
	} else if (xmode < 100) {
		// number still being typed
		var dec = Math.max(0, xmode-1);
		var ll = x.toFixed(dec).length - (dec > 0 ? 1 : 0);
		if (ll > display_digits) {
			// reduce decs if too big for display
			dec -= (ll - display_digits);
			dec = Math.max(0, dec);
		}
		show(i18n(x.toFixed(dec)));
	} else {
		// exponential being typed
		if (x === 0) {
			show(i18n("0"));
		} else {
			var absx = Math.abs(x);
			var power = Math.floor(Math.log(absx)/Math.log(10));
			var mantissa = x / Math.pow(10, power);
			if (power < 0) {
				show(i18n(mantissa.toFixed(6))+"-"+zeropad((-power).toFixed(0),2));
			} else {
				show(i18n(mantissa.toFixed(6))+" "+zeropad(power.toFixed(0),2));
			}
		}
	}
}

function displayX2()
{
	sti();
	displayX3();
}

function displayX()
{
	cli();
	show("");
	window.setTimeout(displayX2, 25);
}

function display_result()
{
	xmode = -1;
	pushed = 0;
	displayX();
}

function prog_pse2()
{
	sti();
	display_result();
}

function prog_pse()
{
	cli();
	window.setTimeout(prog_pse2, 1000);
}

function toogle_decimal_character()
{
	decimal_point_is_comma = decimal_point_is_comma ? 0 : 1;
	display_result();
}

function date_gen(dd)
{
	if (dmy) {
		return dd.getDate() + (dd.getMonth()+1)/100 + dd.getFullYear()/1000000;
	} else {
		return (dd.getMonth()+1) + dd.getDate()/100 + dd.getFullYear()/1000000;
	}
}

function date_show(dd)
{
	var dow = dd.getDay();
	if (dow === 0) {
		dow = 7;
	}
	return date_gen(dd).toFixed(6)+"  "+dow;
}

function display_result_date(dd)
{
	xmode = -1;
	pushed = 0;
	show(date_show(dd));
}

function clear_reg()
{
	alg_op = last_x = x = y = z = w = 0;
	clear_fin();
	clear_sto();
}

// HP-12C Errors
// 0 = Division by zero, LN(negative) etc.
// 1 = STO + arith + memory position if memory position > 4
// 2 = statistics
// 3 = IRR
// 4 = Memory full (only happens in emulator when program typing reaches position 99+1)
// 5 = Composite interest
// 6 = CFj if j >= 30
// 7 = IRR
// 8 = Date

function display_pgrm()
{
	var txt = "";
	if (program_mode == PROGRAMMING) {
		txt = "PGRM";
	} else if (program_mode >= RUNNING) {
		txt = "RUN "+zeropad(instruction_pointer.toFixed(0), 2);
	}
	pgrm.innerHTML = txt;
}

function display_algmode()
{
	if (PLATINUM) {
		var txt = (algmode ? "ALG" : "RPN");
		rpnalg.innerHTML = txt;
	}
}

function display_error(err)
{
	show("ERROR "+err);
	xmode = -1;

	if (program_mode >= RUNNING) {
		// errors stop programs
		program_mode = INTERACTIVE;
		instruction_pointer = 0;
		display_pgrm();
	}

	error_in_display = 1;
}


function display_modifier2(m)
{
	var txt = "";
	if (m == FF) {
		txt = "f";
	} else if (m == GG) {
		txt = "g";
	} else if (m == STO) {
		txt = "STO";
	} else if (m == STO2) {
		txt = "STO★";
	} else if (m == RCL) {
		txt = "RCL";
	} else if (m == RCL2) {
		txt = "RCL★";
	} else if (m == RCL_GG) {
		txt = "RCL g";
	} else if (m == STO_PLUS) {
		txt = "STO+";
	} else if (m == STO_MINUS) {
		txt = "STO-";
	} else if (m == STO_TIMES) {
		txt = "STO×";
	} else if (m == STO_DIVIDE) {
		txt = "STO÷";
	} else if (m == GTO) {
		txt = "GTO";
	} else if (m == GTO_MOVE) {
		txt = "GTO★";
	}
	dmodifier.innerHTML = txt;
}

function display_modifier()
{
	display_modifier2(modifier);
}

function display_begin()
{
	var txt = "";
	if (begin) {
		txt = "BEGIN";
	}
	dbegin.innerHTML = txt;
}

function display_dmyc()
{
	var txt = "";
	if (dmy) {
		txt += "D.MY";
	}
	if (compoundf) {
		txt += "&nbsp;&nbsp;C";
	}
	ddmyc.innerHTML = txt;
}

function set_dmy(v)
{
	dmy = v;
	display_dmyc();
	display_result();
}

function rpn_mode()
{
	algmode = 0;
	alg_op = 0;
	display_algmode();
	display_result();
}

function algebraic_mode()
{
	algmode = 1;
	alg_op = 0;
	display_algmode();
	display_result();
}

function toogle_compoundf()
{
	compoundf = compoundf ? 0 : 1;
	display_dmyc();
	display_result();
}

function set_begin(v)
{
	begin = v;
	display_begin();
	display_result();
}

function set_modifier(v, df)
{
	modifier = v;
	display_modifier();
}

function set_decimals(d)
{
	decimals = d;
	display_result();
}

function set_decimals_exponential()
{
	decimals = 100;
	display_result();
}

function rst_modifier(df)
{
	if (df) {
		do_fincalc = 0;   // disarms financial calculation 
	}
	set_modifier(0, df);
}

function push()
{
	w = z;
	z = y;
	y = x;
	pushed = 1;
}

function digit_add(d)
{
	var number_signal;

	if (xmode == -1) {
		if (! pushed) {
			push(); // push stack when result is immediately followed by typing
		}
		// just displayed a result
		xmode = 0;
		x = d;
	} else if (xmode === 0) {
		number_signal = binary_sgn(x);
		x = Math.abs(x);
		// integer part
		if (x < display_max) {
			x = Math.floor(x)*10 + d;
		}
		x = number_signal * x;
	} else if (xmode <= 15) {
		number_signal = binary_sgn(x);
		x = Math.abs(x);
		// decimal part
		x += d / Math.pow(10, xmode);
		x = number_signal*x;
		++xmode;
	} else if (xmode == 100) {
		var power = Math.floor(Math.log(Math.abs(x))/Math.log(10));
		var mantissa = x / Math.pow(10, power);
		power = (power * 10 + d) % 100;
		x = mantissa * Math.pow(10, power);
	}
	displayX();
}

function digit_delete()
{
	var number_signal;

	if (xmode == -1) {
		// does nothing
		return;
	}

	if (xmode === 0) {
		number_signal = binary_sgn(x);
		x = Math.abs(x);
		// integer part
		x = Math.floor(x / 10);
		x = number_signal*x;
	} else if (xmode == 1) {
		// decimal point mode but no decimal typed
		xmode = 0;
		number_signal = binary_sgn(x);
		x = number_signal * Math.floor(Math.abs(x));
	} else if (xmode <= 15) {
		number_signal = binary_sgn(x);
		x = Math.abs(x);
		x = Math.floor(x * Math.pow(10, xmode-2));
		x = x / Math.pow(10, xmode-2);
		x = number_signal*x;
		--xmode;
	} else if (xmode == 100) {
		var power = Math.floor(Math.log(Math.abs(x))/Math.log(10));
		var mantissa = x / Math.pow(10, power);
		x = mantissa;
		// back to decimal mode
		xmode = 6;
		var sx = x.toFixed(xmode);
		x = parseFloat(sx);
	}
	displayX();
}

function input_exponential()
{
	if (xmode == -1) {
		if (! pushed) {
			push(); // push stack when result is immediately followed by typing
		}
		x = 1;
	} else if (xmode != 100) {
		if (Math.abs(x) < value_min) {
			// assume mantissa is equal to 1
			x = 1;
		}
	}
	xmode = 100;
	displayX();
}

function decimal_point_mode()
{
	if (xmode == -1) {
		// just displayed a result
		if (! pushed) {
			push(); // push stack when result is immediately followed by typing
		}
		xmode = 1;
		x = 0;
	} else if (xmode <= 0) {
		xmode = 1;
	}
	displayX();
}

function chs()
{
	if (xmode == -1) {
		// result mode
		x = -x;
		display_result();
	} else if (xmode == 100) {
		// input mode, inputting exponential
		var power = Math.floor(Math.log(Math.abs(x))/Math.log(10));
		var mantissa = x / Math.pow(10, power);
		x = mantissa * Math.pow(10, -power);
		displayX();
	} else {
		// input mode
		x = -x;
		displayX();
	}
}

function pop()
{
	x = y;
	y = z;
	z = w;
}

function save_lastx()
{
	if (! algmode) {
		last_x = x;
	}
}

function lstx()
{
	push();
	x = last_x;
	display_result();
}

function clear_prefix2()
{
	sti();
	display_result();
}

function clear_prefix()
{
	cli();
	var decimals_orig = decimals;
	decimals = display_digits+1; // more than display can handle
	displayX3();
	decimals = decimals_orig;
	setTimeout(clear_prefix2, 1000);
}

function x_exchange_y()
{
	var tmp = x;
	x = y;
	y = tmp;
	display_result();
}

function r_down()
{
	var tmp = x;
	x = y;
	y = z;
	z = w;
	w = tmp;
	display_result();
}

function clx()
{
	x = 0;
	display_result();
	pushed = 1; // do not push if user retries typing
}

function arithmetic(res)
{
	save_lastx();
	pop();
	x = res;
	display_result();
}

function alg_resolve()
{
	var res;
	var ok = 1;

	if ((! algmode) || (alg_op <= 0)) {
		return ok;
	}

	rst_modifier(1);

	if (alg_op == ALG_PLUS) {
		arithmetic(y + x);
	} else if (alg_op == ALG_MINUS) {
		arithmetic(y - x);
	} else if (alg_op == ALG_MULTIPLY) {
		arithmetic(y * x);
	} else if (alg_op == ALG_DIVIDE) {
		res = y / x;
		if (badnumber(res)) {
			display_error(0);
			ok = 0;
		} else {
			arithmetic(res);
		}
	} else if (alg_op == ALG_POWER) {
		res = Math.pow(y, x);
		if (badnumber(res)) {
			display_error(0);
			ok = 0;
		} else {
			arithmetic(res);
		}
	}
	alg_op = 0;
	return ok;
}

function enter(g_modifier)
{
	if (algmode && alg_op) {
		alg_resolve();
	} else if (! algmode || ! g_modifier) {
		// pushes only if not =, or not in alg mode
		push();
		display_result();
		pushed = 1; // already pushed, do not push twice when user types new number
	} else {
		display_result();
	}
}

function plus()
{ 
	if (algmode) {
		if (! alg_resolve()) {
			return;
		}
		alg_op = ALG_PLUS;
		push();
		display_result();
	} else {
		arithmetic(y + x);
	}
}

function minus()
{
	if (algmode) {
		if (! alg_resolve()) {
			return;
		}
		alg_op = ALG_MINUS;
		push();
		display_result();
	} else {
		arithmetic(y - x);
	}
}

function multiply()
{
	if (algmode) {
		if (! alg_resolve()) {
			return;
		}
		alg_op = ALG_MULTIPLY;
		push();
		display_result();
	} else {
		arithmetic(y * x);
	}
}

function divide()
{
	if (algmode) {
		if (! alg_resolve()) {
			return;
		}
		alg_op = ALG_DIVIDE;
		push();
		display_result();
	} else {
		var res = y / x;
		if (badnumber(res)) {
			display_error(0);
		} else {
			arithmetic(res);
		}
	}
}

function poweryx()
{ 
	if (algmode) {
		if (! alg_resolve()) {
			return;
		}
		alg_op = ALG_POWER;
		push();
		display_result();
	} else {
		var res = Math.pow(y, x);
		if (badnumber(res)) {
			display_error(0);
		} else {
			arithmetic(res);
		}
	}
}

function inverse()
{
	var res = 1/x;
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function square()
{
	var res = Math.pow(x, 2);
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function sqroot()
{
	var res = Math.pow(x, 0.5);
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function exp()
{
	var res = Math.exp(x);
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function ln()
{
	var res = Math.log(x);
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function intg()
{
	save_lastx();
	x = Math.floor(Math.abs(x)) * binary_sgn(x);
	display_result();
}

function rnd()
{
	save_lastx();
	x = cl5_round(x, decimals);
	display_result();
}

function fatorial()
{
	if (x < 0 || x != Math.floor(x) || x > 80) {
		display_error(0);
	} else {
		save_lastx();
		var res = 1;
		for(var e = 2; e <= x; ++e) {
			res *= e;
		}
		x = res;
		display_result();
	}
}

function frac()
{
	save_lastx();
	x = (Math.abs(x) - Math.floor(Math.abs(x))) * binary_sgn(x);
	display_result();
}

function percent()
{
	var res = y * x / 100;
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function percentT()
{
	if (! alg_resolve()) {
		return;
	}

	var res = 100 * x / y;
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function deltapercent()
{
	if (! alg_resolve()) {
		return;
	}

	var res = 100 * (x/y) - 100;
	if (badnumber(res)) {
		display_error(0);
	} else {
		save_lastx();
		x = res;
		display_result();
	}
}

function sto(pos)
{
	stomemory[pos] = x;
	display_result();
}

function stoinfix(pos, operation) {
	var a = stomemory[pos];
	if (operation ==  STO_PLUS) {
		a += x;
	} else if (operation == STO_MINUS) {
		a -= x;
	} else if (operation == STO_TIMES) {
		a *= x;
	} else if (operation == STO_DIVIDE) {
		a /= x;
		if (badnumber(a)) {
			display_error(0);
			return;
		}
	}
	if (Math.abs(a) > value_max) {
		display_error(1);
		return;
	}

	stomemory[pos] = a;
	display_result();
}

function stoCF0()
{
	stomemory[0] = x;
	finmemory[FIN_N] = 0;
	display_result();
}

function stoCFj()
{
	if (finmemory[FIN_N] != Math.floor(finmemory[FIN_N]) || finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX) {
		display_error(6);
	} else {
		finmemory[FIN_N]++;
		stomemory[finmemory[FIN_N]] = x;
		njmemory[finmemory[FIN_N]] = 1; 
		display_result();
	}
}

function rclCFj()
{
	if (finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || Math.floor(finmemory[FIN_N]) != finmemory[FIN_N]) {
		display_error(6);
	} else {
		push();
		x = stomemory[finmemory[FIN_N]];
		--finmemory[FIN_N];
		display_result();
	}
}

function rclNj()
{
	if (finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || Math.floor(finmemory[FIN_N]) != finmemory[FIN_N]) {
		display_error(6);
	} else {
		push();
		x = njmemory[finmemory[FIN_N]];
		display_result();
	}
}

function stoNj()
{
	if (finmemory[FIN_N] != Math.floor(finmemory[FIN_N]) || finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || x != Math.floor(x) || x <= 0) {
		display_error(6);
	} else {
		njmemory[finmemory[FIN_N]] = x;
		display_result();
	}
}

function stofin(pos)
{
	finmemory[pos] = x;
	display_result();
	pushed = 1;
}

function ston_12x()
{
	var res = x * 12;
	if (Math.abs(res) > value_max) {
		display_error(1);
		return;
	}
	x = res;
	stofin(0);
}

function stoi_12div()
{
	x /= 12;
	stofin(1);
}

function rcl(pos)
{
	push(); // every RCL pushes the result to stack
	x = stomemory[pos];
	display_result();
}

function rclfin(pos)
{
	push(); // every RCL pushes the result to stack
	x = finmemory[pos];
	display_result();
}

function stat_sigma_plus()
{
	if (! alg_resolve()) {
		return;
	}

	++stomemory[STAT_N];
	stomemory[STAT_X] += x;
	stomemory[STAT_X2] += x*x;
	stomemory[STAT_Y] += y;
	stomemory[STAT_Y2] += y*y;
	stomemory[STAT_XY] += x*y;
	save_lastx();
	x = stomemory[STAT_N];
	display_result();
	pushed = 1;
}

function stat_sigma_minus()
{
	if (! alg_resolve()) {
		return;
	}

	--stomemory[STAT_N];
	stomemory[STAT_X] -= x;
	stomemory[STAT_X2] -= x*x;
	stomemory[STAT_Y] -= y;
	stomemory[STAT_Y2] -= y*y;
	stomemory[STAT_XY] -= x*y;
	save_lastx();
	x = stomemory[STAT_N];
	display_result();
	pushed = 1;
}

function stat_avgw()
{
	alg_op = 0;
	
	if (stomemory[STAT_X] === 0) {
		display_error(2);
	} else {
		save_lastx();
		x = stomemory[STAT_XY]/stomemory[STAT_X];
		display_result();
	}
}

function stat_avg()
{
	alg_op = 0;

	if (stomemory[STAT_N] === 0) {
		display_error(2);
	} else {
		save_lastx();
		x = stomemory[STAT_X]/stomemory[STAT_N];
		y = stomemory[STAT_Y]/stomemory[STAT_N];
		display_result();
	}
}

function stat_stddev()
{
	alg_op = 0;

	if (stomemory[STAT_N] <= 1 || (stomemory[STAT_N]*stomemory[STAT_X2] - stomemory[STAT_X]*stomemory[STAT_X]) < 0 || (stomemory[STAT_N]*stomemory[STAT_Y2] - stomemory[STAT_Y]*stomemory[STAT_Y]) < 0) {
		display_error(2);
	} else {
		save_lastx();
		x = Math.pow((stomemory[STAT_N]*stomemory[STAT_X2] - stomemory[STAT_X]*stomemory[STAT_X]) / (stomemory[STAT_N]*(stomemory[STAT_N]-1)), 0.5);
		y = Math.pow((stomemory[STAT_N]*stomemory[STAT_Y2] - stomemory[STAT_Y]*stomemory[STAT_Y]) / (stomemory[STAT_N]*(stomemory[STAT_N]-1)), 0.5);
		display_result();
	}
}

function stat_kr(is_x, xx)
{
	if (stomemory[STAT_N] <= 0) {
		return [0, 1];
	}

	if (is_x) {
		if ((stomemory[STAT_N]*stomemory[STAT_X2] - stomemory[STAT_X]*stomemory[STAT_X]) < 0) {
			return [0, 2];
		}
	} else {
		if ((stomemory[STAT_N]*stomemory[STAT_Y2] - stomemory[STAT_Y]*stomemory[STAT_Y]) < 0) {
			return [0, 3];
		}
	}

	var avgx = stomemory[STAT_X]/stomemory[STAT_N];
	var avgy = stomemory[STAT_Y]/stomemory[STAT_N];

	var B = stomemory[STAT_XY] - stomemory[STAT_X]*stomemory[STAT_Y]/stomemory[STAT_N];
	B /= stomemory[STAT_X2] - stomemory[STAT_X]*stomemory[STAT_X]/stomemory[STAT_N];
	if (badnumber(B)) {
		return [0, 4];
	}

	var A = avgy - B*avgx;

	var rr1 = stomemory[STAT_XY] - stomemory[STAT_X]*stomemory[STAT_Y]/stomemory[STAT_N];
	rr1 *= rr1;
	var rr2 = stomemory[STAT_X2] - stomemory[STAT_X]*stomemory[STAT_X]/stomemory[STAT_N];
	var rr3 = stomemory[STAT_Y2] - stomemory[STAT_Y]*stomemory[STAT_Y]/stomemory[STAT_N];
	if (rr2 === 0 || rr3 === 0) {
		return [0, 5];
	}
	var rr = rr1/(rr2*rr3);
	if (badnumber(rr) || rr < 0) {
		return [0, 6];
	}
	var r = Math.pow(rr, 0.5);
	var c;

	if (is_x) {
		if (B === 0) {
			return[0, 7];
		}
		c = (xx - A) / B;
	} else {
		c = A + B * xx;
	}

	if (badnumber(c)) {
		return [0, 8];
	}

	return [1, c, r];
}

function stat_lr(is_x)
{
	alg_op = 0;

	var res = stat_kr(is_x, x);
	if (! res[0]) {
		display_error(2);
	} else {
		save_lastx();
		push();
		push();
		x = res[1];
		y = res[2];
		display_result();
	}
}

function simple_interest()
{
	if (! alg_resolve()) {
		return;
	}

	var n = finmemory[FIN_N];
	var i = finmemory[FIN_I]/100;
	var pv = finmemory[FIN_PV];
	push();
	push();
	push();
	x = n/360 * -pv * i;
	y = -pv;
	z = n/365 * -pv * i;
	display_result();
}


function remap_key(raw)
{
	// map 'raw' keys to HP12-compatible key codes

	var hpkey = raw + 11;  // key 0 ("n") becomes key 11
	var col = (hpkey % 10); // "n" is at column 1; Divide is at column 0
	if (col === 0) {
		// "Divide" is not the key 20; it is the key 10
		// this operation does NOT change column value
		hpkey -= 10;
	}
	var row = Math.floor(hpkey / 10); // "n" and Device are at line 1

	if (hpkey == 47 /* zero */ ) {
		hpkey = 0;
	} else if (col >= 7 && col <= 9 && hpkey != 48 /* point */ && hpkey != 49 /*sigma+*/) {
		// numeric keys: key code is equal to the number it represents
		hpkey = col - 3 * (row-1);
	}

	if (hpkey == 46) {
		// ENTER exception
		hpkey = 36;
	}
	
	return hpkey;
}

var memwin = null;

function show_memory2()
{
	if (! memwin || ! memwin.document) {
		// window has been closed; don't schedule updates anymore
		memwin = null;
		return;
	}

	var windoc = memwin.document;
	var now = new Date();
	var title = windoc.getElementById('tt');
	var e;

	if (title) {
		title.innerHTML = "HP-12C memory at "+now;

		for (e = 0; e < finmemory.length; ++e) {
			windoc.getElementById("finmemory"+e).innerHTML = format_result(finmemory[e]);
		}
		for (e = 0; e < stomemory.length; ++e) {
			windoc.getElementById("stomemory"+e).innerHTML = format_result(stomemory[e]);
		}
		for (e = 0; e < njmemory.length; ++e) {
			windoc.getElementById("njmemory"+e).innerHTML = format_result(njmemory[e]);
		}
		windoc.getElementById("x").innerHTML = format_result(x);
		windoc.getElementById("last_x").innerHTML = format_result(last_x);
		windoc.getElementById("y").innerHTML = format_result(y);
		windoc.getElementById("z").innerHTML = format_result(z);
		windoc.getElementById("w").innerHTML = format_result(w);

		for (e = 0; e < ram.length; ++e) {
			windoc.getElementById("ram"+e).innerHTML = ram[e];
		}
	}

	window.setTimeout(show_memory2, 1000);
}

function show_memory()
{
	memwin = window.open('hp12c' + (PLATINUM ? "-platinum" : "") + '_memory.html');
	window.setTimeout(show_memory2, 1000);
}

function solve_infinity(val)
{
	if (val > Math.pow(10, 95)) {
		val = Math.pow(10,95);
	} else if (val < -Math.pow(10, 95)) {
		val = -Math.pow(10,95);
	}
	return val;
}

function comppmtlim(i, n)
{
	if (Math.abs(i) < 0.00000001) {
		return n;
	} else {
		return ( 1 - Math.pow(1+(i/100),-n) ) / (i/100);
	}
}

function calcNPV(is_n)
{
	var n = finmemory[FIN_N];
	var i = finmemory[FIN_I];
	var pv = finmemory[FIN_PV];
	var pmt = finmemory[FIN_PMT];
	var fv = finmemory[FIN_FV];

	if (n == Math.floor(n) || is_n) {
		return pv + 
			(1 + (i/100)*(begin ? 1:0)) * pmt * comppmtlim(i,n) + 
			fv*Math.pow(1+(i/100),-n);
	} else if (! compoundf) {
		return pv*(1+((i/100)*(n-Math.floor(n)))) + 
			(1 + (i/100)*(begin ? 1:0)) * pmt * comppmtlim(i,Math.floor(n)) +
			fv*Math.pow(1+(i/100),-Math.floor(n));
	} else {
		return pv*Math.pow(1+(i/100),(n - Math.floor(n))) + 
			(1 + (i/100)*(begin ? 1:0)) * pmt * comppmtlim(i,Math.floor(n)) +
			fv*Math.pow(1+(i/100),-Math.floor(n));
	}
}

function financecalc(dependent)
{
	var err = 0;
	if (dependent === 0) {
		err = err || finmemory[FIN_I] <= -100; // i <= -100
	} else if (dependent == 2) {
		err = err || finmemory[FIN_I] <= -100; // i <= -100
	} else if (dependent == 3) {
		err = err || finmemory[FIN_I] <= -100; // i <= -100
		err = err || finmemory[FIN_N] === 0; // n = 0
	} else if (dependent == 4) {
		err = err || finmemory[FIN_I] <= -100; // i <= -100
	}

	if (err) {
		return 5;
	}

	var firstNPV;
	var secondNPV;
	var interpolation_guess;
	var firstguess;
	var secondguess;
	var saved = finmemory[dependent];
	var iteration = INTERPOLATION;
	var threshold = 0.000000000125;
	var threshold_order = 0;

	// correct threshold so it is more "lax" when involved numbers are too big
	if (dependent != FIN_PV) {
		threshold_order += Math.abs(finmemory[FIN_PV]);
	}
	if (dependent != FIN_PMT) {
		threshold_order += Math.abs(finmemory[FIN_PMT]);
	}
	if (dependent != FIN_N && dependent != FIN_PMT) {
		threshold_order += Math.abs(finmemory[FIN_N] * finmemory[FIN_PMT]);
	}
	if (dependent != FIN_FV) {
		threshold_order += Math.abs(finmemory[FIN_FV]);
	}
	if (threshold_order > 0) {
		threshold *= threshold_order;
	}

	if (dependent == FIN_N || dependent == FIN_I || threshold_order <= 0) {
		secondguess = 1;
	} else {
		// initial guess for interpolation must be of same order as other parameters
		secondguess = threshold_order;
	}

	interpolation_guess = 0;

	while (--iteration >= 0) {
		firstguess = secondguess;
		secondguess = interpolation_guess;

		finmemory[dependent] = firstguess;

		if (finmemory[FIN_I] <= -100) {
			break;
		}

		firstNPV = calcNPV(dependent === 0);

		finmemory[dependent] = secondguess;

		if (finmemory[FIN_I] <= -100) {
			break;
		}

		secondNPV = calcNPV(dependent === 0);

		if ( Math.abs(secondNPV) < threshold ) {
			if (dependent === 0) {
				if ((secondguess - Math.floor(secondguess)) > 0.003) {
					finmemory[dependent] = Math.floor(finmemory[dependent])+1;
				} else {
					finmemory[dependent] = Math.floor(finmemory[dependent]);
				}
			}
			return -1;
		}

		var interpolation_B = (secondNPV-firstNPV)/(secondguess-firstguess); // B
		interpolation_guess = firstNPV - firstguess*interpolation_B; // A
		interpolation_guess /= -interpolation_B; // -A/B is the interpolation root
		interpolation_guess = solve_infinity(interpolation_guess);
	}

	// puts back the original value, since the calculated one may be NaN
	finmemory[dependent] = saved;
	return 5;
}

function fincalc2(pos)
{
	sti();
	var err = financecalc(pos, finmemory);
	if (err == -1) {
		// no error
		push();
		x = finmemory[pos];
		display_result();
	} else {
		display_error(err);
	}
}

function sto_or_calc_fin(pos)
{
	if (! alg_resolve()) {
		return;
	}

	if (! do_fincalc) {
		stofin(pos);
		do_fincalc = 1; // next fin. key runs calculation
	} else {
		cli();
		show("running");
		window.setTimeout(function() { fincalc2(pos); }, 200);
	}
}

function inner_npv()
{
	var res = stomemory[0];
	var n = finmemory[FIN_N];
	var i = finmemory[FIN_I];
	var pmt = 0;
	for(var e = 1; e <= n; ++e) {
		var cf = stomemory[e];
		for(var f = 1; f <= njmemory[e]; ++f) {
			++pmt;
			res += cf / Math.pow(1+(i/100), pmt);
		}
	}
	return res;
}

function npv()
{
	alg_op = 0;
	x = inner_npv();
	display_result();
}

function inner_npvsum()
{
	var res = Math.abs(stomemory[0]);
	var n = finmemory[FIN_N];
	for(var e = 1; e <= n; ++e) {
		res += Math.abs(stomemory[e]);
	}
	return res;
}

function inner_irr()
{
	var firstNPV;
	var secondNPV;
	var interpolation_guess;
	var firstguess;
	var secondguess;
	var iteration = INTERPOLATION;

	var threshold = 0.000000000125;
	var threshold_order = inner_npvsum();

	if (threshold_order > 0) {
		threshold *= threshold_order;
	}

 	if (finmemory[FIN_I] <= -100 || finmemory[FIN_I] > 10000000000) {
		finmemory[FIN_I] = 0;
	}

	firstguess = finmemory[FIN_I] + 1;
	secondguess = finmemory[FIN_I];

	while(--iteration > 0) {
		finmemory[FIN_I] = firstguess;
		firstNPV = inner_npv();
		finmemory[FIN_I] = secondguess;
		secondNPV = inner_npv();

		if (finmemory[FIN_I] < -100 || finmemory[FIN_I] > 10000000000) {
			// pathological
			return 3;
		}

		if (Math.abs(secondNPV) < threshold) {
			// we've made it
			return -1;
		}

		var interpolation_B = (secondNPV-firstNPV)/(secondguess-firstguess); // B
		interpolation_guess = firstNPV - firstguess*interpolation_B; // A
		interpolation_guess /= -interpolation_B; // -A/B is the interpolation root
		interpolation_guess = solve_infinity(interpolation_guess);

		firstguess = secondguess;
		secondguess = interpolation_guess;
	}
	return 7;
}

function irr()
{
	alg_op = 0;

	show("running");
	var err = inner_irr();
	if (err != -1) {
		display_error(err);
	} else {
		push();
		x = finmemory[FIN_I];
		display_result();
	}
}

function tzoffset(d)
{
	// returns the time zone offset, expressed as "hours *behind* UTC".
	// that would be 180 minutes for Brazil (-0300) and -60 minutes for Germany (+0100)
	return d.getTimezoneOffset() * 60000;
}

function date_check(year, month, day)
{
	var daymax = 31;
	if (month == 4 || month == 6 || month == 9 || month == 11) {
		daymax = 30;
	} else if (month == 2) {
		daymax = 28;
		if ((year % 4) === 0 && (((year % 100) !== 0) || ((year % 400) === 0))) {
			// leap: divisible by 4 and not ending with 00
			//       years ending in 00 but divisible by 400 are leap!
			daymax = 29;
		}
	}
	if (day <= 0 || day > daymax || year <= 0 || year > 9999 || month <= 0 || month > 12) {
		return 0;
	}
	return 1;
}

function date_interpret(n)
{
	n = Math.round(Math.abs(n)*1000000);
	var day = Math.round(n / 1000000) % 100;
	var month = Math.round(n / 10000) % 100;
	var year = Math.round(n % 10000);

	if (! dmy) {
		var tmp = day;
		day = month;
		month = tmp;
	}

	if (! date_check(year, month, day)) {
		return null;
	}

	// set date at noon, so daylight savings timezone transtion will not change the day.
	return new Date(year, month-1, day, 12, 0, 0); 
}

function date_diff(d1, d2)
{
	// Dates' timezones may be different because of daylight savings, so we
	// need to compensate for.
	//
	// Math.round could be enough to do this compensation, but we prefer to
	// be twice as safe.
	
	return Math.round(((d2.getTime() - tzoffset(d2)) - (d1.getTime() - tzoffset(d1)))/86400000);
}

function date_add(dbase, days)
{
	// daylight savings timezone not a problem as long as dbase is > 1:01am,
	// so even 1 or 2 hour changes will not change the day.
	dbase.setTime(dbase.getTime() + Math.floor(days)*86400000);
}

function date_diff30(d1, d2)
{
	var dd1 = d1.getDate();
	var dd2 = d2.getDate();
	var z1 = dd1;
	var z2 = dd2;

	if (dd1 == 31) {
		z1 = 30;
	}

	if (dd2 == 31) {
		if (dd1 >= 30) {
			z2 = 30;
		}
	}

	var fdt1 = 360*d1.getFullYear() + 30*(d1.getMonth()+1) + z1;
	var fdt2 = 360*d2.getFullYear() + 30*(d2.getMonth()+1) + z2;

	return fdt2 - fdt1;
}


function date_date()
{
	alg_op = 0;

	var base = date_interpret(y);
	if (base === null) {
		display_error(8);
		return;
	}
	date_add(base, x);
	pop(); // eat original arguments 
	x = date_gen(base); // and fill with newly calculated date
	display_result_date(base);
}

function date_dys()
{
	alg_op = 0;

	var d2 = date_interpret(x);
	var d1 = date_interpret(y);
	if ((d1 === null) || (d2 === null)) {
		display_error(8);
		return;
	}
	x = date_diff(d1, d2);
	y = date_diff30(d1, d2);
	display_result();
}

function amortization()
{
	alg_op = 0;

	var requested_n = x;
	var orig_n = finmemory[FIN_N];
	var i = finmemory[FIN_I]/100;

	// AMORT rounds present value to shown decimals
	var pv = cl5_round(finmemory[FIN_PV], decimals);
	finmemory[FIN_PV] = pv;

	// AMORT rounds payment to shown decimals
	var pmt = cl5_round(finmemory[FIN_PMT], decimals);
	finmemory[FIN_PMT] = pmt;

	if (requested_n <= 0 || requested_n != Math.floor(requested_n) || i <= -1) {
		display_error(5);
		return;
	}

	var tot_interest = 0;
	var tot_amort = 0;

	for (var e = 1; e <= requested_n; ++e) {
		var interest = cl5_round(-pv * i, decimals);
		if (e == 1 && begin && orig_n <= 0) {
			// front payment has no interest
			interest = 0;
		}
		var capital_amortization = pmt - interest;
		tot_interest += interest;
		tot_amort += capital_amortization;
		pv += capital_amortization;
	}

	push();
	push();
	push();
	x = tot_interest; 
	y = tot_amort;
	z = requested_n;
	finmemory[FIN_N] += requested_n;
	finmemory[FIN_PV] += tot_amort;

	display_result();
}

function bond_previous_coupon(buy, maturity)
{
	// calculates last coupon paid just before buy

	var coupons = 0;
	var last_coupon = new Date(maturity);
	var next_coupon;

	while (last_coupon > buy) {
		next_coupon = new Date(last_coupon);
		++coupons;
		last_coupon.setDate(1);
		last_coupon.setMonth(last_coupon.getMonth() - 6);
		var month = last_coupon.getMonth();
		last_coupon.setDate(maturity.getDate());
	
		if (last_coupon.getMonth() != month) {
			// day > 28, overflowed into next month
			// Javascript trick: set to day 0 goes to last day of previous month
			// last_coupon.setDate(0);
			
			// We *could* do this calculation, but HP-12C returns Error 8 in this case,
			// so do we
			return null;
		}
	}

	return [last_coupon, next_coupon, coupons];
}

function _bond_price(desired_rate, coupon_year, buy, maturity)
{
	var price;
	var tot_interest;

	// * HP-12C only calculates semi-annual bonds i.e. bonds which pay coupons every 6 mo
	// * Value paid at maturity is always = 100

	var coupon_date = maturity;
	var tottime = date_diff(buy, maturity); 

	if (tottime <= 0) {
		return null;
	}

	var res = bond_previous_coupon(buy, maturity);

	if (res === null) {
		return null;
	}

	var E = date_diff(res[0], res[1]);
	var dsc = date_diff(buy, res[1]);	// time between settlement (buying) and next coupon
	var coupons = res[2];			// coupons that will be paid until maturity
	var dcs = E - dsc;			// time since last coupon, paid before we bought it.

	if (tottime <= E) {
		price = (100*(100+coupon_year/2)) / (100+((tottime/E)*desired_rate/2)); // present-value price
	} else {
		price = 100 / Math.pow(1+desired_rate/200, coupons-1+dsc/E); // present-value price
		for (var e = 1; e <= coupons; ++e) {
			// accumulate present value of all future coupons
			price += (coupon_year/2) / Math.pow(1+desired_rate/200, e-1+dsc/E); 
		}
	}
	tot_interest = (coupon_year / 2) * dcs/E;
	price -= tot_interest; // coupon fraction compound before we bought it

	if (badnumber(price) || badnumber(tot_interest)) {
		return null;
	}

	return [price, tot_interest];
}

function bond_price()
{
	alg_op = 0;

	var desired_rate = finmemory[FIN_I];
	if (desired_rate <= -100) {
		display_error(5);
		return;
	}

	var coupon_year = finmemory[FIN_PMT];

	var buy = date_interpret(y);
	if (buy === null) {
		display_error(8);
		return;
	}

	var maturity = date_interpret(x);
	if (maturity === null) {
		display_error(8);
		return;
	}

	res = _bond_price(desired_rate, coupon_year, buy, maturity);

	if (! res) {
		display_error(5);
		return;
	}

	push();
	push();
	finmemory[FIN_N] = x = res[0];
	y = res[1];
	display_result();
}



function bond_yield()
{
	alg_op = 0;

	var desired_rate;
	var coupon_year = finmemory[FIN_PMT];
	var buy = date_interpret(y);
	if (buy === null) {
		display_error(8);
		return;
	}
	var maturity = date_interpret(x);
	if (maturity === null) {
		display_error(8);
		return;
	}
	var price = finmemory[FIN_PV];
	if (price <= 0) {
		display_error(5);
		return;
	}

	var firstNPV;
	var secondNPV;
	var interpolation_guess;
	var firstguess;
	var secondguess;
	var iteration = INTERPOLATION;

	var threshold = 0.000000000125 * Math.abs(price);

	firstguess = 0;
	secondguess = firstguess+1;

	while(--iteration > 0) {
		res = _bond_price(firstguess, coupon_year, buy, maturity);
		if (! res) {
			display_error(5);	
			return;
		}
		firstNPV = res[0] - price;

		res = _bond_price(secondguess, coupon_year, buy, maturity);
		if (! res) {
			display_error(5);	
			return;
		}
		secondNPV = res[0] - price;

		if (firstguess < -100 || firstguess > 10000000000) {
			// pathological
			display_error(5);
			return;
		}

		if (Math.abs(secondNPV) < threshold) {
			// we've made it
			desired_rate = secondguess;
			break;
		}

		var interpolation_B = (secondNPV-firstNPV)/(secondguess-firstguess); // B
		interpolation_guess = firstNPV - firstguess*interpolation_B; // A
		interpolation_guess /= -interpolation_B; // -A/B is the interpolation root
		interpolation_guess = solve_infinity(interpolation_guess);

		firstguess = secondguess;
		secondguess = interpolation_guess;
	}

	push();
	push();
	finmemory[FIN_I] = x = desired_rate;
	display_result();
}

function depreciation_sl()
{
	alg_op = 0;

	var cost = finmemory[FIN_PV];
	var sell = finmemory[FIN_FV];
	var life = finmemory[FIN_N];
	var year = x;
	var depr = 0;
	var rest = cost - sell;

	if (year < 0 || year != Math.floor(year) || life <= 0 || life > Math.pow(10,10)) {
		display_error(5);
		return;
	}
	while (--year >= 0) {
		depr = (cost - sell)/life;
		if (badnumber(depr)) {
			display_error(0);
			return;
		}
		rest -= depr;
	}
	push();
	push();
	x = depr;
	y = rest;
	display_result();
}

function depreciation_soyd()
{
	alg_op = 0;

	var cost = finmemory[FIN_PV];
	var sell = finmemory[FIN_FV];
	var life = finmemory[FIN_N];
	var year = x;
	var depr = 0;
	var rest = cost - sell;

	if (year < 0 || year != Math.floor(year) || life <= 0 || life > Math.pow(10,10)) {
		display_error(5);
		return;
	}
	var year_up = 0;
	var soyd = life*(life+1)/2;
	while (--year >= 0) {
		depr = (cost - sell)*(life - (++year_up) + 1)/soyd;
		if (badnumber(depr)) {
			display_error(0);
			return;
		}
		rest -= depr;
	}
	push();
	push();
	x = depr;
	y = rest;
	display_result();
}

function depreciation_db()
{
	alg_op = 0;

	var cost = finmemory[FIN_PV];
	var sell = finmemory[FIN_FV];
	var life = finmemory[FIN_N];
	var db = finmemory[FIN_I]/100;
	var year = x;
	var depr = 0;
	var rest = cost - sell;

	if (year < 0 || year != Math.floor(year) || life <= 0 || life > Math.pow(10,10)) {
		display_error(5);
		return;
	}
	while (--year >= 0) {
		depr = (rest+sell)*db/life;
		if (badnumber(depr)) {
			display_error(0);
			return;
		}
		rest -= depr;
	}
	push();
	push();
	x = depr;
	y = rest;
	display_result();
}

function display_program_opcode()
{
	var txt = zeropad(instruction_pointer.toFixed(0), ram_ADDR_SIZE) + "-" + ram[instruction_pointer];
	show(txt);
}

function prog_pr()
{
	if (program_mode == INTERACTIVE) {
		program_mode = PROGRAMMING;
		// EPX: entering programming mode does not reset instruction pointer
		// instruction_pointer = 0;
		display_pgrm();
		display_program_opcode();
	}
}

function prog_bst2()
{
	sti();
	display_result();
}

function prog_bst()
{
	if (instruction_pointer > 0) {
		--instruction_pointer;
	}
	display_program_opcode();
	cli();
	window.setTimeout(prog_bst2, 200);
}

function program_stop()
{
	program_mode = INTERACTIVE;
	display_pgrm();
	display_result();
}

var opcodes = [];

opcodes[0] =    "";
opcodes[FF] =   "42.";
opcodes[GG] =   "43.";
opcodes[STO] =  "44.";
opcodes[STO2] = "44.48.";
opcodes[STO_PLUS] =  "44.40.";
opcodes[STO_MINUS] =  "44.30.";
opcodes[STO_TIMES] =  "44.20.";
opcodes[STO_DIVIDE] =  "44.10.";
opcodes[RCL] =  "45.";
opcodes[RCL2] = "45.48.";
opcodes[RCL_GG] = "45.43.";
opcodes[GTO] = "43.33.";
opcodes[GTO_MOVE] = "43.33.48.";

function program_poke(instruction)
{
	if ((instruction_pointer + 1) >= ram_MAX) {
		display_error(4);
		return;
	}
	++instruction_pointer;

	// The HP-12C *replaces* instructions on edit, does not insert them!
	//
	// for(var e = ram_MAX - 1; e > instruction_pointer; --e) {
	//	ram[e] = ram[e-1];
	// }
	ram[instruction_pointer] = instruction;
}

var program_execute = null;

function program_sched()
{
	if (program_mode >= RUNNING) {
		display_pgrm();
		window.setTimeout(program_execute, 200);
	}
}

program_execute = function()
{
	if (program_mode < RUNNING) {
		return;
	}

	if (! keyboard) { // we are inside a pause; resched to later
		program_sched();
		return;
	}

	if (instruction_pointer <= 0) {
		instruction_pointer = 1;
		display_pgrm();
	}

	var op = ram[instruction_pointer].split(".");
	var e;

	for (e = 0; e < op.length; ++e) {
		op[e] = parseInt(op[e], 10);
	}

	if (op.length == 3 && op[0] == 43 && op[1] == 33) { // GTO
		instruction_pointer = op[2];
	} else if (op.length == 2 && op[0] == 43 && op[1] == 34) { // x <= y
		instruction_pointer += (x <= y ? 1 : 2);
	} else if (op.length == 2 && op[0] == 43 && op[1] == 35) { // x === 0
		instruction_pointer += (x === 0 ? 1 : 2);
	} else if (op.length == 1 && op[0] == 31) {		   // R/S
		++instruction_pointer;
		program_stop();
	} else if (op.length == 2 && op[0] == 42 && op[1] == 31) {   // f + P/R
		// ignore (but should not happen anyway)
	} else if (op.length == 2 && op[0] == 42 && op[1] == 31) {   // f + CLEAR PGRM
		// ignore (but should not happen anyway)
	} else {
		for (e = 0; e < op.length; ++e) {
			if (window['kk'+op[e]]) {
				window['kk'+op[e]]();
			}
		}
		++instruction_pointer;
	}

	if (instruction_pointer <= 0) { // GTO 00
		program_stop();
	} else if (instruction_pointer > (ram_MAX-1)) { // top of RAM
		instruction_pointer = 0;
		program_stop();
	} else if (program_mode == RUNNING_STEP) {
		program_mode = INTERACTIVE;
		display_pgrm();
	} else {
		program_sched();
	}	
};

function program_run_step()
{
	program_mode = RUNNING_STEP;
	if (instruction_pointer <= 0) {
		instruction_pointer = 1;
	}
	display_pgrm();
	program_sched();
}

function prog_sst()
{
	if (program_mode == INTERACTIVE) {
		program_run_step();
	}
}

function program_run()
{
	program_mode = RUNNING;
	if (instruction_pointer <= 0) {
		instruction_pointer = 1;
	}
	display_pgrm();
	program_sched();
}

function prog_rs()
{
	if (program_mode == INTERACTIVE) {
		display_result();
		program_run();
	} else {
		program_stop();
	}
}

function program_type(key)
{
	if (key == 31 && modifier == FF) { // f + P/R exits programming mode
		rst_modifier(1);
		program_mode = INTERACTIVE;
		instruction_pointer = 0;
		display_pgrm();
		display_modifier();
		display_result();
		return;

	// basic program navigation keys

	} else if (key == 32 && ! modifier) { // SST
		if (++instruction_pointer >= ram_MAX) {
			instruction_pointer = 0;
		}
		rst_modifier(1);
	} else if ((key == 32 && modifier == GG) || key == 98) { // BST
		if (--instruction_pointer < 0) {
			instruction_pointer = 99;
		}
		rst_modifier(1);
	} else if (key == 33 && modifier == FF) { // f + CLEAR PGRM
		clear_prog();
		rst_modifier(1);

	// modifier logic

	} else if (key == 42) { // f
		set_modifier(FF, 1);
	} else if (key == 43) {
		if (modifier != RCL) { // g not preceded by RCL
			set_modifier(GG, 1);
		} else {
			set_modifier(RCL_GG, 1);
		}
	} else if (key == 44) { // STO
		set_modifier(STO, 1);
	} else if (key == 45) { // RCL
		set_modifier(RCL, 1);

	// keys potentialized by modifiers
	
	} else if (key == 48 && modifier == STO) { // STO + decimal point
		set_modifier(STO2, 1);
	} else if (key == 48 && modifier == RCL) { // RCL + decimal point
		set_modifier(RCL2, 1);
	} else if ((key == 40) && modifier == STO) { // STO + arithmetic
		set_modifier(STO_PLUS, 1); 
	} else if ((key == 30) && modifier == STO) { // STO + arithmetic
		set_modifier(STO_MINUS, 1); 
	} else if ((key == 20) && modifier == STO) { // STO + arithmetic
		set_modifier(STO_TIMES, 1); 
	} else if ((key == 10) && modifier == STO) { // STO + arithmetic
		set_modifier(STO_DIVIDE, 1); 

	// GTO <numeric> <numeric> logic

	} else if (modifier == GTO_MOVE && key >= 0 && key < 10) { // GTO . n
		gtoxx = "" + gtoxx + key.toFixed(0);
		if (gtoxx.length >= ram_ADDR_SIZE) {
			instruction_pointer = parseInt(gtoxx, 10) % ram_MAX;
			gtoxx = "";
			rst_modifier(1);
		}
		
	} else if (modifier == GTO && key == 48) { // GTO .
		set_modifier(GTO_MOVE, 1);
	} else if (modifier == GTO && key >= 0 && key < 10) { // GTO n
		gtoxx = "" + gtoxx + key.toFixed(0);
		if (gtoxx.length >= ram_ADDR_SIZE) {
			gtoxx = zeropad(parseInt(gtoxx, 10) % ram_MAX, ram_ADDR_SIZE);
			program_poke(opcodes[modifier]+gtoxx);
			gtoxx = "";
			rst_modifier(1);
		}
	} else if (modifier == GG && key == 33) { // GTO
		set_modifier(GTO, 1);
		gtoxx = "";
	} else {
		// non-modifier typing, finishes an instruction
		if (! (window['kk'+key].valid_modifiers & modifier)) {
			// invalid modifier, cancel modifier
			modifier = 0;
		}
		var instruction = opcodes[modifier] + zeropad(key.toFixed(0), INSTRUCTION_SIZE);
		program_poke(instruction);
		rst_modifier(1);
	}

	display_program_opcode();
}


















function kk11() // n
{
	if (modifier == FF) {
		amortization();
		rst_modifier(1);
	} else if (modifier == GG) {
		ston_12x();
		rst_modifier(0);
	} else if (modifier == RCL) {
		rclfin(0);
		rst_modifier(1);
	} else if (modifier == STO) {
		stofin(0);
		rst_modifier(0);
	} else {
		sto_or_calc_fin(0);
		rst_modifier(0);
	}
}

// NOTE: function.valid_modifiers do not include compound modifiers
//
// For example: <RCL g CFj>.  RCL is not a valid modifier for "g", 
// because <RCL g> is itself a modifier, not an operation.
//
// In the other hand, RCL_GG is included at (CFj key).valid_modifiers,
// because RCL g CFj as a whole is an operation.
//
// Compound modifiers are handled by program_type() itself, using custom code
// (maybe there should be a valid_compound_modifiers property to handle that more cleanly?).
//
// The only keys that accept absolutely all modifiers (simple or compound), 
// except by RCL-g, are the number keys.

kk11.valid_modifiers = FF | GG | STO | RCL ;

function kk12() // i
{
	if (modifier == FF) {
		simple_interest(); 
		rst_modifier(1);
	} else if (modifier == GG) {
		stoi_12div();
		rst_modifier(0);
	} else if (modifier == RCL) {
		rclfin(1);
		rst_modifier(1);
	} else if (modifier == STO) {
		stofin(1);
		rst_modifier(0);
	} else {
		sto_or_calc_fin(1);
		rst_modifier(0);
	}
}

kk12.valid_modifiers = FF | GG | STO | RCL ;

function kk13() // PV
{
	if (modifier == FF) {
		npv();
		rst_modifier(1);
	} else if (modifier == GG) {
		stoCF0();
		rst_modifier(1);
	} else if (modifier == RCL) {
		rclfin(2);
		rst_modifier(1);
	} else if (modifier == STO) {
		stofin(2);
		rst_modifier(0);
	} else {
		sto_or_calc_fin(2);
		rst_modifier(0);
	}
}

kk13.valid_modifiers = FF | GG | STO | RCL ;

function kk14() // PMT
{
	if (modifier == FF) {
		rnd();
		rst_modifier(1);
	} else if (modifier == RCL_GG) {
		rclCFj();
		rst_modifier(1);
	} else if (modifier == GG) {
		stoCFj();
		rst_modifier(1);
	} else if (modifier == RCL) {
		rclfin(3);
		rst_modifier(1);
	} else if (modifier == STO) {
		stofin(3);
		rst_modifier(0);
	} else {
		sto_or_calc_fin(3);
		rst_modifier(0);
	}
}

kk14.valid_modifiers = FF | GG | STO | RCL | RCL_GG ;

function kk15() // FV
{
	if (modifier == FF) {
		irr();
		rst_modifier(1);
	} else if (modifier == RCL_GG) {
		rclNj();
		rst_modifier(1);
	} else if (modifier == GG) {
		stoNj(); 
		rst_modifier(1);
	} else if (modifier == RCL) {
		rclfin(4);
		rst_modifier(1);
	} else if (modifier == STO) {
		stofin(4);
		rst_modifier(0);
	} else {
		sto_or_calc_fin(4);
		rst_modifier(0);
	}
}

kk15.valid_modifiers = FF | GG | STO | RCL | RCL_GG ;

function kk16() // CHS
{
	if (modifier == GG) {
		date_date();
	} else if (PLATINUM && modifier == FF) {
		rpn_mode();
	} else {
		chs();
	}
	rst_modifier(1);
}

kk16.valid_modifiers = FF | GG ;

function kk7() // key 7
{
	if (modifier == FF) {
		set_decimals(7);
		rst_modifier(1);
	} else if (modifier == GG) {
		set_begin(1);
		rst_modifier(0);
	} else if (modifier == STO) {
		sto(7);
		rst_modifier(1);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(7, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(7);
		rst_modifier(1);
	} else if (modifier == STO2) {
		sto(17);
		rst_modifier(1);
	} else if (modifier == RCL2) {
		rcl(17);
		rst_modifier(1);
	} else {
		digit_add(7);
		rst_modifier(1);
	}
}

kk7.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk8() // key 8
{
	if (modifier == FF) {
		set_decimals(8);
		rst_modifier(1);
	} else if (modifier == GG) {
		set_begin(0);
		rst_modifier(0);
	} else if (modifier == STO) {
		sto(8);
		rst_modifier(1);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(8, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(8);
		rst_modifier(1);
	} else if (modifier == STO2) {
		sto(18);
		rst_modifier(1);
	} else if (modifier == RCL2) {
		rcl(18);
		rst_modifier(1);
	} else {
		digit_add(8);
		rst_modifier(1);
	}
}

kk8.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk9() // key 9
{
	if (modifier == FF) {
		set_decimals(9);
	} else if (modifier == GG) {
		// we don't need to mix statistical and programming memories
	} else if (modifier == STO) {
		sto(9);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(9, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(9);
	} else if (modifier == STO2) {
		sto(19);
	} else if (modifier == RCL2) {
		rcl(19);
	} else {
		digit_add(9);
	}
	rst_modifier(1);
}

kk9.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk10() // Divide
{
	if (modifier == STO) {
		set_modifier(STO_DIVIDE, 1);
	} else {
		divide();
		rst_modifier(1);
	}
}

kk10.valid_modifiers = 0;

function kk21() // power
{
	if (modifier == FF) {
		bond_price();
	} else if (modifier == GG) {
		sqroot();
	} else {
		poweryx();
	}
	rst_modifier(1);
}

kk21.valid_modifiers = FF | GG ;

function kk22() // inverse
{
	if (modifier == FF) {
		bond_yield();
	} else if (modifier == GG) {
		exp();
	} else {
		inverse();
	}
	rst_modifier(1);
}

kk22.valid_modifiers = FF | GG ;

function kk23() // %T
{
	if (modifier == FF) {
		depreciation_sl();
	} else if (modifier == GG) {
		ln();
	} else {
		percentT();
	}
	rst_modifier(1);
}

kk23.valid_modifiers = FF | GG ;

function kk24() // delta%
{
	if (modifier == FF) {
		depreciation_soyd();
	} else if (modifier == GG) {
		frac();
	} else {
		deltapercent();
	}
	rst_modifier(1);
}

kk24.valid_modifiers = FF | GG ;

function kk25() // %
{
	if (modifier == FF) {
		depreciation_db();
	} else if (modifier == GG) {
		intg();
	} else {
		percent();
	}
	rst_modifier(1);
}

kk25.valid_modifiers = FF | GG ;

function kk26() // EEX (exponential notation)
{
	if (modifier == GG) {
		date_dys();
	} else if (PLATINUM && modifier == FF) {
		algebraic_mode();
	} else if (modifier == STO) {
		toogle_compoundf();
	} else {
		input_exponential();
	}
	rst_modifier(1);
}

kk26.valid_modifiers = FF | GG | STO ;

function kk4() // key 4
{
	if (modifier == FF) {
		set_decimals(4);
	} else if (modifier == GG) {
		set_dmy(1);
	} else if (modifier == STO) {
		sto(4);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(4, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(4);
	} else if (modifier == STO2) {
		sto(14);
	} else if (modifier == RCL2) {
		rcl(14);
	} else {
		digit_add(4);
	}
	rst_modifier(1);
}

kk4.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk5() // key 5
{
	if (modifier == FF) {
		set_decimals(5);
	} else if (modifier == GG) {
		set_dmy(0);
	} else if (modifier == STO) {
		sto(5);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(5, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(5);
	} else if (modifier == STO2) {
		sto(15);
	} else if (modifier == RCL2) {
		rcl(15);
	} else {
		digit_add(5);
	}
	rst_modifier(1);
}

kk5.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk6() // key 6
{
	if (modifier == FF) {
		set_decimals(6);
	} else if (modifier == GG) {
		stat_avgw();
	} else if (modifier == STO) {
		sto(6);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(6, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(6);
	} else if (modifier == STO2) {
		sto(16);
	} else if (modifier == RCL2) {
		rcl(16);
	} else {
		digit_add(6);
	}
	rst_modifier(1);
}

kk6.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk20() // Multiply
{
	if (modifier == STO) {
		set_modifier(STO_TIMES, 1);
	} else if (PLATINUM && modifier == GG) {
		square();
		rst_modifier(1);
	} else {
		multiply();
		rst_modifier(1);
	}
}

kk20.valid_modifiers = 0;

if (PLATINUM) {
	kk20.valid_modifiers = GG;
}

function kk31() // R/S
{
	if (modifier == GG) {
		prog_pse();
	} else if (modifier == FF) {
		prog_pr();
	} else {
		prog_rs();
	}
	rst_modifier(1);
}

kk31.valid_modifiers = FF | GG ;

function kk32() // SST
{
	if (modifier == FF) {
		clear_statistics();
		display_result();
	} else if (modifier == GG) {
		prog_bst();
	} else {
		prog_sst();
	}
	rst_modifier(1);
}

kk32.valid_modifiers = FF | GG ;


function kk33() // r-down
{
	if (modifier == FF) {
		clear_prog();
		display_result();
	} else if (modifier == GG) {
		// GTO; no effect on normal mode
		display_result();
	} else {
		r_down();
	}
	rst_modifier(1);
}

kk33.valid_modifiers = FF | GG;

function kk34() // x--y
{
	if (modifier == FF) {
		clear_fin();
		display_result();
	} else if (modifier == GG) {
		// X < Y; no effect on normal mode
		display_result();
	} else {
		x_exchange_y();
	}
	rst_modifier(1);
}

kk34.valid_modifiers = FF | GG ;

function kk35() // clx
{
	if (modifier == FF) {
		clear_reg();
		display_result();
	} else if (modifier == GG) {
		// X === 0; no effect on normal mode
		display_result();
	} else {
		clx();
	}
	rst_modifier(1);
}

kk35.valid_modifiers = FF | GG ;

function kk36() // ENTER
{
	if (modifier == FF) {
		clear_prefix();
	} else if (modifier == GG) {
		if (PLATINUM) {
			enter(1);
		} else {
			lstx();
		}
	} else {
		enter(0);
	}
	rst_modifier(1);
}

kk36.valid_modifiers = FF | GG ;

function kk1() // key 1
{
	if (modifier == FF) {
		set_decimals(1);
	} else if (modifier == GG) {
		stat_lr(1);
	} else if (modifier == STO) {
		sto(1);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(1, modifier);
		rst_modifier(1);
	} else if (modifier == STO2) {
		sto(11);
	} else if (modifier == RCL) {
		rcl(1);
	} else if (modifier == RCL2) {
		rcl(11);
	} else {
		digit_add(1);
	}
	rst_modifier(1);
}

kk1.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk2() // key 2
{
	if (modifier == FF) {
		set_decimals(2);
	} else if (modifier == GG) {
		stat_lr(0);
	} else if (modifier == STO) {
		sto(2);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(2, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(2);
	} else if (modifier == STO2) {
		sto(12);
	} else if (modifier == RCL2) {
		rcl(12);
	} else {
		digit_add(2);
	}
	rst_modifier(1);
}

kk2.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk3() // key 3
{
	if (modifier == FF) {
		set_decimals(3);
	} else if (modifier == GG) {
		fatorial();
	} else if (modifier == STO) {
		sto(3);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(3, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(3);
	} else if (modifier == STO2) {
		sto(13);
	} else if (modifier == RCL2) {
		rcl(13);
	} else {
		digit_add(3);
	}
	rst_modifier(1);
}

kk3.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk30() // Minus
{
	if (modifier == STO) {
		set_modifier(STO_MINUS, 1);
	} else {
		minus();
		rst_modifier(1);
	}
}

kk30.valid_modifiers = 0;

function kk41() // On
{
	toogle_decimal_character();
	rst_modifier(1);
	save_memory();
}

kk41.valid_modifiers = 0;

function kk42() // f modifier
{
	set_modifier(FF, 1);
}

kk42.valid_modifiers = 0;

function kk43() // g modifier
{
	if (modifier == RCL) {
		set_modifier(RCL_GG, 1);
	} else {
		set_modifier(GG, 1);
	}
}

kk43.valid_modifiers = 0;

function kk44() // STO modifier
{
	set_modifier(STO, 1);
}

kk44.valid_modifiers = 0;

function kk45() // RCL modifier
{
	set_modifier(RCL, 1);
}

kk45.valid_modifiers = 0;

function kk0() // key 0,, x average
{
	if (modifier == FF) {
		set_decimals(0);
	} else if (modifier == GG) {
		stat_avg();
	} else if (modifier == STO) {
		sto(0);
	} else if (modifier == STO2) {
		sto(10);
	} else if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
		stoinfix(0, modifier);
		rst_modifier(1);
	} else if (modifier == RCL) {
		rcl(0);
	} else if (modifier == RCL2) {
		rcl(10);
	} else {
		digit_add(0);
	}
	rst_modifier(1);
}

kk0.valid_modifiers = FF | GG | STO | STO2 | RCL | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk48() // decimal point
{
	if (modifier == FF) {
		set_decimals_exponential();
		rst_modifier(1);
	} else if (modifier == GG) {
		stat_stddev();
		rst_modifier(1);
	} else if (modifier == STO) {
		set_modifier(STO2, 1);
	} else if (modifier == RCL) {
		set_modifier(RCL2, 1);
	} else {
		decimal_point_mode();
		rst_modifier(1);
	}
}

kk48.valid_modifiers = FF | GG ;

function kk49() // Sigma-plus
{
	if (modifier == GG) {
		stat_sigma_minus();
	} else {
		stat_sigma_plus();
	}
	rst_modifier(1);
}

kk49.valid_modifiers = GG;

function kk40() // Plus
{
	if (modifier == STO) {
		set_modifier(STO_PLUS, 1);
	} else if (PLATINUM && modifier == GG) {
		lstx();
		rst_modifier(1);
	} else {
		plus();
		rst_modifier(1);
	}
}

kk40.valid_modifiers = 0;

if (PLATINUM) {
	kk40.valid_modifiers = GG;
}

function kk98() // Backspace
{
	digit_delete();
}

kk98.valid_modifiers = 0;

function dispatch(key)
{
	var fname = 'kk'+key;
	if (key == 99) {
		show_memory();
	} else if (window[fname]) {
		if (program_mode == INTERACTIVE && keyboard) {
			if (error_in_display) {
				error_in_display = 0;
				display_result();
			} else {
				window[fname]();
			}
		} else if (program_mode == PROGRAMMING) {
			program_type(key);
		} else if (program_mode >= RUNNING) {
			program_stop();
		}
	}
}

/*
// coordinates good for 700x438 image of the calculator.
// those coordinates will be recalculated by setup process.

var xoff = 38; // first key x

var yoff = 149; // first key y
var xl =  88 - xoff; // key width
var yl = 189 - yoff; // key height
var xd = 101 - xoff; // x distance between keys
var yd = 220 - yoff; // y distance
*/

var xoff, yoff, xl, yl, xd, yd;

var kbdtable = {};
kbdtable['0'] = 0;
kbdtable['.'] = 48;
kbdtable[','] = 48;
kbdtable['1'] = 1;
kbdtable['2'] = 2;
kbdtable['3'] = 3;
kbdtable['4'] = 4;
kbdtable['5'] = 5;
kbdtable['6'] = 6;
kbdtable['7'] = 7;
kbdtable['8'] = 8;
kbdtable['9'] = 9;
kbdtable['+'] = 40;
kbdtable['-'] = 30;
kbdtable['*'] = 20;
kbdtable['/'] = 10;
kbdtable['\r'] = 36;
kbdtable['\n'] = 36;
kbdtable['='] = 36;
kbdtable['c'] = 35;
kbdtable['C'] = 35;
kbdtable['h'] = 16;
kbdtable['H'] = 16;
kbdtable['e'] = 26;
kbdtable['E'] = 26;
kbdtable['f'] = 42;
kbdtable['F'] = 42;
kbdtable['g'] = 43;
kbdtable['G'] = 43;
kbdtable['s'] = 44;
kbdtable['S'] = 44;
kbdtable['r'] = 45;
kbdtable['R'] = 45;
kbdtable['n'] = 11;
kbdtable['N'] = 11;
kbdtable['i'] = 12;
kbdtable['I'] = 12;
kbdtable['p'] = 13;
kbdtable['P'] = 13;
kbdtable['m'] = 14;
kbdtable['M'] = 14;
kbdtable['v'] = 15;
kbdtable['V'] = 15;
kbdtable['#'] = 23;
kbdtable['$'] = 24;
kbdtable['%'] = 25;
kbdtable['!'] = 21;
kbdtable['\\'] = 22;
kbdtable['x'] = 34;
kbdtable['X'] = 34;
kbdtable['d'] = 33;
kbdtable['D'] = 33;
kbdtable['w'] = 49;
kbdtable['W'] = 49;
kbdtable['o'] = 41;
kbdtable['O'] = 41;
kbdtable['['] = 31;
kbdtable[']'] = 32;
kbdtable['&&'] = 99;
kbdtable[String.fromCharCode(8)] = 98;

function key_pressed(event) {
	var pos_x = (event.offsetX ? event.offsetX : (event.pageX - pointer_div.offsetLeft)) - xoff;
	var pos_y = (event.offsetY ? event.offsetY : (event.pageY - pointer_div.offsetTop)) - yoff;

	if (pos_x < 0 || pos_y < 0 || pos_x >= xd*10 || pos_y >= yd*4) {
		return;
	}

	var key = Math.floor(pos_x / xd) + 10*Math.floor(pos_y / yd);
	while (pos_x > xd) {
		pos_x -= xd;
	}
	while (pos_y > yd) {
		pos_y -= yd;
	}
	var in_key = (pos_x < xl) && ((pos_y < yl) || key == 25);
	if (in_key) {
		dispatch(remap_key(key));
	}
}

function kbd(e)
{
	var keynum;
	var keychar;
	var numcheck;

	if (window.event) {
		e = window.event;
		keynum = window.event.keyCode;
	} else if (e.which) {
		keynum = e.which;
	} else {
		return true;
	}

	keychar = String.fromCharCode(keynum);

	var kk = kbdtable[keychar];
	if (kk !== undefined && kk !== null) {
		dispatch(kbdtable[keychar]);
		e.returnValue = false;
		if (e.preventDefault) {
			e.preventDefault();
		}
		return false;
	}
	return true;
}

function Init_hp12c()
{
	clear_prog();
	clear_sto();
	clear_fin();

	display = document.getElementById("display");
	pointer_div = document.getElementById("pointer_div");

	// recalculate keyboard coordinates
	var kx = parseInt(pointer_div.style.width, 10) / 700.0;
	var ky = parseInt(pointer_div.style.height, 10) / 438.0;

	xoff = 44.0 * kx;
	yoff = 151.0 * ky;

	xl = 54.0 * kx;
	yl = 50.0 * ky;

	xd = (606.0 - 44.0) / 9 * kx;
	yd = (364.0 - 151.0) / 3 * ky;

	dbegin = document.getElementById("begin");
	ddmyc = document.getElementById("dmyc");
	dmodifier = document.getElementById("modifier");
	pgrm = document.getElementById("pgrm");
	if (PLATINUM) {
		rpnalg = document.getElementById("rpnalg");
	}
	init_lcd();

	if (has_lcd) {
		lcd_clear();
	}
	recover_memory();
	displayX();
	display_modifier();
	display_begin();
	display_dmyc();
	display_pgrm();
	display_algmode();
	sti();

	document.onkeypress = kbd;
	window.onunload = close_hp12c;
	window.beforenunload = close_hp12c;
	document.onunload = close_hp12c;
	document.beforeunload = close_hp12c;
}
