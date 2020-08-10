rd/s/q dist
start /wait cmd /c npm run build


del templateVue.rar
start /wait cmd /c "C:\Program Files (x86)\WinRAR\WinRAR" a -r -ep1 templateVue.rar dist
