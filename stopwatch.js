/**
* stopwatch : 無名関数で囲む
*/
(function(){
    var startTime,
        timerId,
        running = false, // ストップウォッチが起動中かどうか。初期値はfalse.
        stopTime;


    /**
    * オンクリック定義
    */
    document.getElementById('run').onclick   = function(){
        run();
    }
    document.getElementById('stop').onclick  = function(){
        stop();
    }
    document.getElementById('reset').onclick = function(){
        reset();
    }

    /**
    * runメソッド: startボタンが押されたら稼働
    */
    function run(){

        // 初回にスタートボタンが押された時はrunning = falseなのでスルー。2回目にstartボタンが押された時は下記でtrueにしているので、これ以上、
        // run()メソッドは稼働しない
        // もしrunningがtrueなら、これ以上はrun()メソッドは発動されない。
        if(running){
            return;
        }


        // STOPボタンが押された時
        // もしstopTimeが定義されていれば（何かstopTimeに値が入っていれば）、
        if(stopTime){

            // ここのロジックが全く分からない。。
            // startTimeを更新する。 最初のrun()メソッドが発動した時刻 + 現在時刻　- stopを押した時間
            //                        5 + 10 - 8= 7分 ????
            startTime = startTime + (new Date()).getTime() - stopTime;
        }

        // 一番最初にStartボタンを押したとき
        // もしstartTimeが定義されていなければ(何も値が入っていなければ）、
        if(!startTime){
            // run()メソッドが発動した時刻をstartTimeに保存する
            startTime = (new Date()).getTime();
        }   
        
        // スタートボタンが2度以上押された場合に、再度timer()メソッドを起動しないようにするために、runnnig = trueにする 
        running = true;

        // timerメソッドを稼働させる
        timer();
    }


    /**
    * timerメソッド
    */
    function timer(){

        // 現在時刻 - startボタンを押した時刻（runメソッドが発動した時刻）＝　run()メソッド発動してからの経過時間　を 1000で割って、秒に変換する。それを小数点2桁まで表したいから、
        document.getElementById('sec').innerHTML = (((new Date()).getTime() - startTime) / 1000).toFixed(2);
        
        // timer関数を0.1秒毎に開始（更新）して、id='sec'のinnerHTMLに表示する。
        timerId = setTimeout(function(){
            timer();   
        },100);
    }



    /**
    * stopメソッド
    */
    function stop(){
        clearTimeout(timerId);

        // stop()メソッドが発動した時刻をstopTimeに保存する
        stopTime = (new Date()).getTime();

        // stopしたらrunningはfalseになる
        running = false;
    }


    /**
    * resetメソッド
    */
    function reset(){

        // もしrunningがtrueなら、これ以上はreset()メソッドは発動されない。falseにするには、stopボタンを押すしかない。
        if(running){
            return;
        }

        // startTimeを初期化　←ここっているの？
        startTime = undefined;

        // 0.00をid='sec'のinnerHTMLに表示する。
        document.getElementById('sec').innerHTML = '0.00';
    }
})();
