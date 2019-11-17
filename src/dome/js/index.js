var $list = $('.navbar-nav li');

$list.on('click', function () {
    $(this).attr('class', 'active').siblings().removeClass();

    let index = $(this).index();

    $('main>div').eq(index).addClass('show').siblings().removeClass('show');
});

let url = "http://jsonplaceholder.typicode.com/todos"


class httpQue {
    get(url) {
        return new Promise((res, rej) => {
            fetch(url)
                .then(resdata => resdata.json())
                .then(data => res(data))
                .catch(err => rej(err))
        })
    }
}


function storege(data) {
    if (data) {
        var str
        data.forEach((elemt, i) => {
            var { userId, id, title, completed } = elemt;

            if (completed) {
                completed = 'checked';
            } else {
                completed = '';
            }
            $(".content").append($(`<ul class="contentlist">
           <li>用户id: <span>${userId}</span></li>
           <li>案例id: <span>${id}</span></li>
           <li>标题: <span>${title}</span></li>
           <li>状态: 
                <p></p>
            <input type="checkbox" ${completed} aria-label="...">
            </li>
        </ul>`))
        });
    }
}
let Http = new httpQue
Http.get(url)
    .then(data => storege(data))
    .catch(err => console.log(err))



$('.btn').on('click', function () {

    var $id = $('.id').val() ? 'id=' + $('.id').val() : "";
    var $username = $('.username').val() ? '&username=' + $('.username').val() : "";
    var $phone = $('.phone').val() ? '&phone=' + $('.phone').val() : "";
    var $company = $('.company').val() ? '&company.name=' + $('.company').val() : "";

    let searchUrl = `http://jsonplaceholder.typicode.com/users?${$id}${$username}${$phone}${$company}`;
    console.log(searchUrl)
    Http.get(searchUrl)
        .then(data => searchData(data))
        .catch(err => console.log(err))

})
$('.reset').on('click', () => {
    $(".infoList tr").remove()
})

function searchData(data) {
    if (data) {
        data.forEach((elemt, i) => {
            console.log(data)
            var { id, username, phone } = elemt;
            var companyname = elemt.company.name
            $(".infoList").append($(`
                <tr >
                    <td>${id}</td>
                    <td>${username}</td>
                    <td>${phone}</td>
                    <td>${companyname}</td>
                </tr>
            `))
        })
        
        $('.infoList>tr').on("click",function(){
            data.forEach((elemt,i)=>{
                var { id, username, phone,name } = elemt;
                var companyname = elemt.company.name
                $(".infoBox").append(`
                <div class="row">
                        <h3>档案详细信息</h3>
                        <p>
                            <span>id:</span>
                            <span>${id}</span>
                        </p>
                        <p>
                            <span>username: :</span>
                            <span>${username}</span>
                        </p>
                        <p>
                            <span>name:</span>
                            <span>${name}</span>
                        </p>
                        <p>
                            <span>company name:</span>
                            <span>${companyname}</span>
                        </p>
                        <p><a href="#" class="btn btn-primary" role="button">关闭</a> 
                </div>

                `)
            })
            $('.infoBox').removeClass('dis');
        })
        $(".infoBox").on("click",function(evt){
            let btn = evt.target;
                if(btn.className == "btn btn-primary"){
                    $(this).addClass('dis')
                }
        })
    }
}
