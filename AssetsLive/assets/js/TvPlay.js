var TvPlay = function () {
    var _componentUniform = function () {
        $('.playercontainer').allofthelights({
            'z_index': '10001',
            'callback_turn_off': function () {
                $(".switch").html('<i class="fa fa-lightbulb"></i> IŞIKLARI AÇ');
            },
            'callback_turn_on': function () {
                $(".switch").html('<i class="fa fa-lightbulb"></i> IŞIKLARI KAPAT');
            }
        });
    };
    //var _play = function () {
    //    var datavi = $(".playercontainer").data("vi");
    //    var playerElement = document.getElementById("player-wrapper");
    //    var playerElementx = $("#player-wrapper");
    //    if (datavi) {
    //        eval(atob(datavi));
    //    }
        
    //};
    var _basicLoad = function () {
      
        $('#SelectedSourceId').change(function () {
            window.location = '?ss='+$(this).val();
        });
        $(".btngoal").on("click", function () {
            var matchname = $(this).data("matchname");
            var isrc = $(this).data("isrc");
            $("#matchName").html(matchname);
            $("#goalIframe").attr("src",isrc);
            $("#modalGoal").modal("show");
        });
        $('#modalGoal').on('hidden.bs.modal', function () {
            $("#goalIframe").attr("src", "");
        });
    };
    return {
        initComponents: function () {
            _componentUniform();
        },
        initOnLoad: function () {
            _basicLoad();
        }
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    TvPlay.initComponents();
});


$(window).on('load', function () {
    TvPlay.initOnLoad();
});
