
# useState hook 
- Là một trạng thái dữ liệu ( vd: khi thay đổi từ dữ liệu này sang dữ liệu kia)

## Dùng khi nào ?
Khi muốn dữ liệu thay đổi thì giao diện tự động được cập nhật (render lại theo dữ liệu)

### Cách dùng

'''jsx
import { useState } from 'React'  : lấy ra từ thư viện React

function Component() {
    const(state, setState) = useState(initState)

    ....

}
...
 #### Lưu ý 
 - Component sẽ được re-render sau khi setState
 - Initial state chỉ được sử dụng cho lần đầu
 - Set state với callback ? 
 - Initial state với callback ?
 - Set state là thay thế state bằng giá trị mới


 ### useEffect 
 ## Các ứng dụng thường gặp
 1. update DOM
 2. Call API
 3. Listen DOM events
    + scroll
    + Resize
 4. Clean up
    + Remove listener / Unsubscribe
    + clear timer

## 3 trường hợp cần phải học 
 1. useEffect(callback)
    - Gọi callback mỗi khi combonent được render
    - Gọi callback sau khi component thêm element vào DOM
 2. useEffect(callback, [])
    - Chỉ gọi callback 1 lần sau khi component mounted
 3. useEffect(callback, [deps])
    - Callback sẽ được gọi lại mỗi khi deps thay đổi

 --- lưu ý chung
   1. Callback luôn được gọi sau khi combonent mounted
   2. Cleanup function luôn được gọi trước khi combonent unmounted
   3. Cleanup function luôn được gọi trước khi callback được gọi (trừ  lần mounted)


### useEffect 
   1. Cập nhật lại state
   2. Cập nhật DOM
   3. Render lại UI
   4. Gọi cleanup nếu deps thay đổi (sync)
   5. Gọi useEffect callback

### useLayoutEffect 
   1. Cập nhật lại state
   2. Cập nhật DOM
   3. Gọi cleanup nếu deps thay đổi (sync)
   4. Gọi useLayoutEffect callback 
   5. Render lại UI

### useRef 
   1. Lưu lại giá trị qua một tham chiếu bên ngoài
   2. function component

### memo 
   được sử dụng để không bị re-render lại các component cần thiết
   1 component được re-render khi có ít nhất một props thay đổi


### useCallback()
   Giúp tránh tạo ra những hàm mới một cách không cần thiết trong function component

### useReducer()
   sử dụng như useState nhưng được sử dụng ở các trường hợp phức tạp hơn
   Sử dụng useReducer can làm những công việc gì
   1. init state: 0
   2. Actions: 
   3. Reducer
   4. Dispatch