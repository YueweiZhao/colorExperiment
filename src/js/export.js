import xlsx from 'xlsx';

/**
 * 输入格式：
 * {
 *       name: 'excel的名字',
 *       sheets: [
 *           {
 *               name: '第一章',
 *               data: ['aa,bb,cc,dd', 'ee,ff,gg,hh'] //
 *           },
 *           {
 *               name: '第二章',
 *               data: ['aa2,bb2,cc2,dd2', 'ee2,ff2,gg2,hh2', 'ee2,ff2,gg2,hh2', 'ee2,ff2,gg2,hh2', 'ee2,ff2,gg2,hh2', 'ee2,ff2,gg2,hh2', 'ee2,ff2,gg2,hh2']
 *           },
 *           {
 *               name: '第三章',
 *               data: ['aa,bb,cc,dd', 'ee,ff,gg,hh']
 *           }
 *       ]
 *   }
 * @param excel
 */
function exportExcel(excel) {
    openDownloadDialog(sheets2Blob(excel.sheets), excel.name + '.xlsx');
}

function array2sheet(array) {
    let sheet = {};
    array.forEach(function (row, i) {
        row = row.split(',');
        if (i === 0) {
            sheet['!ref'] = 'A1:' + String.fromCharCode(65 + row.length - 1) + (array.length);
        }
        row.forEach(function (col, j) {
            sheet[String.fromCharCode(65 + j) + (i + 1)] = {v: col};
        });
    });
    return sheet;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheets2Blob(sheets) {
    let workbook = {
        SheetNames: [],
        Sheets: {}
    };
    for (let sheetData of sheets) {
        let sheet = array2sheet(sheetData.data);
        let sheetName = sheetData.name;
        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = sheet;
    }
    let workbookOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };
    return new Blob([s2ab(xlsx.write(workbook, workbookOptions))], {type: "application/octet-stream"});
}

// 字符串转ArrayBuffer
function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

export const exportAsExcel = exportExcel;
