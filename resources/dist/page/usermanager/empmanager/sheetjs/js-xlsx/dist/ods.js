/* copied from js-xls (C) SheetJS Apache2 license */

var ODS={};(function make_ods(ODS){function cc2str(arr){var o="";for(var i=0;i!=arr.length;++i)o+=String.fromCharCode(arr[i]);return o}function getdata(data){return data?data.data?data.data:data.asNodeBuffer&&has_buf?data.asNodeBuffer().toString("binary"):data.asBinary?data.asBinary():data._data&&data._data.getContent?cc2str(Array.prototype.slice.call(data._data.getContent(),0)):null:null}function safegetzipfile(zip,file){var f=file;return zip.files[f]?zip.files[f]:(f=file.toLowerCase(),zip.files[f]?zip.files[f]:(f=f.replace(/\//g,"\\"),zip.files[f]?zip.files[f]:null))}function getzipfile(zip,file){var o=safegetzipfile(zip,file);if(o==null)throw new Error("Cannot find file "+file+" in zip");return o}function getzipdata(zip,file,safe){if(!safe)return getdata(getzipfile(zip,file));if(!file)return null;try{return getzipdata(zip,file)}catch(e){return null}}function parsexmltag(tag,skip_root){var z=[],eq=0,c=0;for(;eq!==tag.length;++eq)if((c=tag.charCodeAt(eq))===32||c===10||c===13)break;skip_root||(z[0]=tag.substr(0,eq));if(eq===tag.length)return z;var m=tag.match(attregexg),j=0,w="",v="",i=0,q="",cc="";if(m)for(i=0;i!=m.length;++i){cc=m[i];for(c=0;c!=cc.length;++c)if(cc.charCodeAt(c)===61)break;q=cc.substr(0,c),v=cc.substring(c+2,cc.length-1);for(j=0;j!=q.length;++j)if(q.charCodeAt(j)===58)break;j===q.length?z[q]=v:z[(j===5&&q.substr(0,5)==="xmlns"?"xmlns":"")+q.substr(j+1)]=v}return z}function strip_ns(x){return x.replace(nsregex2,"<$1")}function unescapexml(text){var s=text+"";return s.replace(encregex,function($$){return encodings[$$]}).replace(coderegex,function(m,c){return String.fromCharCode(parseInt(c,16))})}function escapexml(text){var s=text+"";return s.replace(decregex,function(y){return rencoding[y]}).replace(charegex,function(s){return"_x"+("000"+s.charCodeAt(0).toString(16)).substr(-4)+"_"})}function parsexmlbool(value,tag){switch(value){case"1":case"true":case"TRUE":return!0;default:return!1}}function datenum(v){var epoch=Date.parse(v);return(epoch+22091616e5)/864e5}function parse_isodur(s){var sec=0,mt=0,time=!1,m=s.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);if(!m)throw new Error("|"+s+"| is not an ISO8601 Duration");for(var i=1;i!=m.length;++i){if(!m[i])continue;mt=1,i>3&&(time=!0);switch(m[i].substr(m[i].length-1)){case"Y":throw new Error("Unsupported ISO Duration Field: "+m[i].substr(m[i].length-1));case"D":mt*=24;case"H":mt*=60;case"M":if(!time)throw new Error("Unsupported ISO Duration Field: M");mt*=60;case"S":}sec+=mt*parseInt(m[i],10)}return sec}function xlml_normalize(d){if(has_buf&&Buffer.isBuffer(d))return d.toString("utf8");if(typeof d=="string")return d;throw"badf"}var get_utils=function(){if(typeof XLSX!="undefined")return XLSX.utils;if(typeof module!="undefined"&&typeof require!="undefined")try{return require("../xlsx").utils}catch(e){try{return require("./xlsx").utils}catch(ee){return require("xlsx").utils}}throw new Error("Cannot find XLSX utils")},has_buf=typeof Buffer!="undefined",_fs,jszip;typeof JSZip!="undefined"&&(jszip=JSZip),typeof exports!="undefined"&&typeof module!="undefined"&&module.exports&&(has_buf&&typeof jszip=="undefined"&&(jszip=require("jszip")),typeof jszip=="undefined"&&(jszip=require("./jszip").JSZip),_fs=require("fs"));var attregexg=/\b[\w:-]+=["'][^"]*['"]/g,tagregex=/<[^>]*>/g,nsregex=/<\w*:/,nsregex2=/<(\/?)\w+:/,encodings={"&quot;":'"',"&apos;":"'","&gt;":">","&lt;":"<","&amp;":"&"},rencoding={'"':"&quot;","'":"&apos;",">":"&gt;","<":"&lt;","&":"&amp;"},rencstr="&<>'\"".split(""),encregex=/&[a-z]*;/g,coderegex=/_x([\da-fA-F]+)_/g,decregex=/[&<>'"]/g,charegex=/[\u0000-\u0008\u000b-\u001f]/g,xlmlregex=/<(\/?)([a-z0-9]*:|)([\w-]+)[^>]*>/mg,CT_ODS="application/vnd.oasis.opendocument.spreadsheet",parse_manifest=function(d,opts){var str=xlml_normalize(d),Rn,FEtag;while(Rn=xlmlregex.exec(str))switch(Rn[3]){case"manifest":break;case"file-entry":FEtag=parsexmltag(Rn[0]);if(FEtag.path=="/"&&FEtag.type!==CT_ODS)throw new Error("This OpenDocument is not a spreadsheet");break;case"encryption-data":case"algorithm":case"start-key-generation":case"key-derivation":throw new Error("Unsupported ODS Encryption");default:throw Rn}},parse_text_p=function(text,tag){return utf8read(text.replace(/<text:s\/>/g," ").replace(/<[^>]*>/g,""))},utf8read=function utf8reada(orig){var out="",i=0,c=0,d=0,e=0,f=0,w=0;while(i<orig.length){c=orig.charCodeAt(i++);if(c<128){out+=String.fromCharCode(c);continue}d=orig.charCodeAt(i++);if(c>191&&c<224){out+=String.fromCharCode((c&31)<<6|d&63);continue}e=orig.charCodeAt(i++);if(c<240){out+=String.fromCharCode((c&15)<<12|(d&63)<<6|e&63);continue}f=orig.charCodeAt(i++),w=((c&7)<<18|(d&63)<<12|(e&63)<<6|f&63)-65536,out+=String.fromCharCode(55296+(w>>>10&1023)),out+=String.fromCharCode(56320+(w&1023))}return out},parse_content_xml=function(){var number_formats={day:["d","dd"],month:["m","mm"],year:["y","yy"],hours:["h","hh"],minutes:["m","mm"],seconds:["s","ss"],"am-pm":["A/P","AM/PM"],"day-of-week":["ddd","dddd"]};return function pcx(d,opts){var str=xlml_normalize(d),state=[],tmp,tag,NFtag,NF,pidx,sheetag,Sheets={},SheetNames=[],ws={},Rn,q,ctag,textp,textpidx,textptag,R,C,range={s:{r:1e6,c:1e7},e:{r:0,c:0}},number_format_map={},merges=[],mrange={},mR=0,mC=0;while(Rn=xlmlregex.exec(str))switch(Rn[3]){case"table":Rn[1]==="/"?(range.e.c>=range.s.c&&range.e.r>=range.s.r&&(ws["!ref"]=get_utils().encode_range(range)),merges.length&&(ws["!merges"]=merges),SheetNames.push(sheetag.name),Sheets[sheetag.name]=ws):Rn[0].charAt(Rn[0].length-2)!=="/"&&(sheetag=parsexmltag(Rn[0]),R=C=-1,range.s.r=range.s.c=1e7,range.e.r=range.e.c=0,ws={},merges=[]);break;case"table-row":if(Rn[1]==="/")break;++R,C=-1;break;case"covered-table-cell":++C;break;case"table-cell":if(Rn[0].charAt(Rn[0].length-2)==="/")ctag=parsexmltag(Rn[0]),ctag["number-columns-repeated"]?C+=parseInt(ctag["number-columns-repeated"],10):++C;else if(Rn[1]!=="/"){++C,C>range.e.c&&(range.e.c=C),R>range.e.r&&(range.e.r=R),C<range.s.c&&(range.s.c=C),R<range.s.r&&(range.s.r=R),ctag=parsexmltag(Rn[0]),q={t:ctag["value-type"],v:null};if(ctag["number-columns-spanned"]||ctag["number-rows-spanned"])mR=parseInt(ctag["number-rows-spanned"],10)||0,mC=parseInt(ctag["number-columns-spanned"],10)||0,mrange={s:{r:R,c:C},e:{r:R+mR-1,c:C+mC-1}},merges.push(mrange);switch(q.t){case"boolean":q.t="b",q.v=parsexmlbool(ctag["boolean-value"]);break;case"float":q.t="n",q.v=parseFloat(ctag.value);break;case"percentage":q.t="n",q.v=parseFloat(ctag.value);break;case"currency":q.t="n",q.v=parseFloat(ctag.value);break;case"date":q.t="n",q.v=datenum(ctag["date-value"]),q.z="m/d/yy";break;case"time":q.t="n",q.v=parse_isodur(ctag["time-value"])/86400;break;case"string":q.t="s";break;default:throw new Error("Unsupported value type "+q.t)}}else q.t==="s"&&(q.v=textp),textp&&(q.w=textp),opts.sheetRows&&opts.sheetRows<R||(ws[get_utils().encode_cell({r:R,c:C})]=q),q=null;break;case"document-content":case"spreadsheet":case"scripts":case"font-face-decls":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else Rn[0].charAt(Rn[0].length-2)!=="/"&&state.push([Rn[3],!0]);break;case"shapes":case"frame":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else Rn[0].charAt(Rn[0].length-2)!=="/"&&state.push([Rn[3],!1]);break;case"number-style":case"percentage-style":case"date-style":case"time-style":if(Rn[1]==="/"){number_format_map[NFtag.name]=NF;if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else Rn[0].charAt(Rn[0].length-2)!=="/"&&(NF="",NFtag=parsexmltag(Rn[0]),state.push([Rn[3],!0]));break;case"script":break;case"automatic-styles":break;case"style":break;case"font-face":break;case"paragraph-properties":break;case"table-properties":break;case"table-column-properties":break;case"table-row-properties":break;case"table-cell-properties":break;case"number":switch(state[state.length-1][0]){case"time-style":case"date-style":tag=parsexmltag(Rn[0]),NF+=number_formats[Rn[3]][tag.style==="long"?1:0]}break;case"day":case"month":case"year":case"era":case"day-of-week":case"week-of-year":case"quarter":case"hours":case"minutes":case"seconds":case"am-pm":switch(state[state.length-1][0]){case"time-style":case"date-style":tag=parsexmltag(Rn[0]),NF+=number_formats[Rn[3]][tag.style==="long"?1:0]}break;case"boolean-style":break;case"boolean":break;case"text-style":break;case"text":if(Rn[0].substr(-2)==="/>")break;if(Rn[1]==="/")switch(state[state.length-1][0]){case"number-style":case"date-style":case"time-style":NF+=str.slice(pidx,Rn.index)}else pidx=Rn.index+Rn[0].length;break;case"text-content":break;case"text-properties":break;case"body":break;case"forms":break;case"table-column":break;case"graphic-properties":break;case"calculation-settings":break;case"named-expressions":break;case"named-range":break;case"span":break;case"p":Rn[1]==="/"?textp=parse_text_p(str.slice(textpidx,Rn.index),textptag):(textptag=parsexmltag(Rn[0]),textpidx=Rn.index+Rn[0].length);break;case"s":break;case"date":break;case"annotation":break;case"object":break;case"title":break;case"desc":break;case"database-ranges":break;case"database-range":break;case"filter":break;case"filter-and":break;case"filter-or":break;case"filter-condition":break;default:if(opts.WTF)throw Rn}var out={Sheets:Sheets,SheetNames:SheetNames};return out}}(),parse_ods=function(zip,opts){return parse_content_xml(getzipdata(zip,"content.xml"),opts)};ODS.parse_ods=parse_ods})(typeof exports!="undefined"?exports:ODS);