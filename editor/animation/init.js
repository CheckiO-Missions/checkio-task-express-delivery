//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html(result_addon);
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new ExpressDeliveryCanvas($content.find(".explanation")[0]);
            canvas.createCanvas(checkioInput);
            canvas.animateCanvas(checkioInput, userResult);


            this_e.setAnimationHeight($content.height() + 60);

        });

        function ExpressDeliveryCanvas(dom) {
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var boxPath = "M-15.644,-38L-38,-22.306L-22.542,-8.997L-0,-23.962zM-22.541,-8.997L-0,5.967L-15.644,20.006L-38,4.313zM22.541,-8.997L38,4.313L15.644,20.007L-0,5.968zM22.541,-8.997L-0,-23.962L15.644,-38L38,-22.306zM15.735,22.985L22.449,18.272L22.449,23.556L0.046,38L-22.357,23.556L-22.357,18.272L-15.644,22.985L0.046,8.988z";

            var options = options || {};

            var x0 = options.x0 || 10;
            var y0 = options.y0 || 10;

            var cellSize = options.cell || 40;

            var attrCell = {"stroke": colorBlue4, "stroke-width": 2};
            var attrStephan = {"stroke": colorBlue4, "stroke-width": 3, "fill": colorOrange1};
            var attrStephanText = {"stroke": colorBlue4, "font-size": cellSize * 0.5, "font-family": "Verdana", "font-weight": "bold"};
            var attrExitText = {"stroke": colorOrange4, "fill": colorOrange4, "font-size": cellSize * 0.5, "font-family": "Verdana", "font-weight": "bold"};
            var attrTime = {"stroke": colorBlue4, "font-size": cellSize * 0.7, "font-family": "Verdana", "font-weight": "bold"};
            var attrBox = {"stroke-width": 0, "fill": colorBlue1};


            var sKoof = 3 / 8;

            var fullSizeX;
            var fullSizeY;
            var paper;

            var fieldSet;
            var boxSet;
            var stephan;
            var timeText;
            var delay = 300;

            this.createCanvas = function (field) {
                fullSizeX = x0 * 2 + cellSize * field[0].length;
                fullSizeY = y0 * 2 + cellSize * field.length + cellSize;
                paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
                fieldSet = paper.set();
                boxSet = paper.set();
                stephan = paper.set();
                timeText = paper.text(fullSizeX / 2, fullSizeY - cellSize / 2, "0").attr(attrTime);

                for (var r = 0; r < field.length; r++) {
                    for (var c = 0; c < field[0].length; c++) {
                        var symb = field[r][c];
                        var cell = paper.rect(c * cellSize + x0, r * cellSize + y0, cellSize, cellSize);
                        cell.attr(attrCell);
                        cell.toBack();
                        if (symb == "W") {
                            cell.attr("fill", colorBlue3);
                        }
                        if (symb == "S") {
                            stephan.push(paper.circle(
                                (c + 0.5) * cellSize + x0, (r + 0.5) * cellSize + y0, cellSize * sKoof).attr(attrStephan));
                            stephan.push(
                                paper.text((c + 0.5) * cellSize + x0, (r + 0.5) * cellSize + y0, "S").attr(attrStephanText)
                            );
                        }
                        if (symb == "B") {
                            var k = 0.33;
                            var tr = "t" + ((c + 0.5) * cellSize + x0) + "," + ((r + 0.5) * cellSize + y0) + "s" + k;
                            var b = paper.path(boxPath).attr(attrBox);
                            b.transform(tr);
                            boxSet.push(b);
                        }
                        if (symb == "E") {
                            paper.text((c + 0.5) * cellSize + x0, (r + 0.5) * cellSize + y0, "E").attr(attrExitText);
                        }

                    }
                }
            };

            this.animateCanvas = function (field, route) {
                var mx = field[0].length,
                    my = field.length;

                var row = 0,
                    col = 0;

                var time = 0;
                var holdBox = true;
                var i = -1;

                if (typeof(route) !== 'string') {
                    return false;
                }

                var actionString = "LRDUB";

                (function move() {
                    i++;
                    stephan.toFront();

                    var step = route[i];


                    timeText.attr("text", time);
                    if (field[row][col] == "W") {
                        return false;
                    }
                    if (row < 0 || row >= my || col < 0 || col >= mx) {
                        return false;
                    }
                    if (field[row][col] == "E" && holdBox) {
                        return false;
                    }
                    if (i >= route.length) {
                        return false;
                    }
                    if (actionString.indexOf(step) == -1) {
                        return false;
                    }
                    if (step == "B") {
                        if (holdBox) {
                            if (field[row][col] == "B") {
                                holdBox = false;
                                time += 1;
                                boxSet.animate({"fill": colorBlue3}, delay, move);
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            if (field[row][col] == "B") {
                                holdBox = true;
                            }
                            time += 1;
                            boxSet.animate({"fill": colorBlue1}, delay, move);
                        }
                    }
                    else {
                        time += 1 + holdBox;
                        if (step == "U") {
                            row -= 1;
                            stephan.animate({"transform": "...t" + 0 + "," + (-cellSize)}, (holdBox + 1) * delay, move);
                        }
                        else if (step == "D") {
                            row += 1;
                            stephan.animate({"transform": "...t" + 0 + "," + cellSize}, (holdBox + 1) * delay, move);
                        }
                        else if (step == "L") {
                            col -= 1;
                            stephan.animate({"transform": "...t" + (-cellSize) + "," + 0}, (holdBox + 1) * delay, move);
                        }
                        else if (step == "R") {
                            col += 1;
                            stephan.animate({"transform": "...t" + cellSize + "," + 0}, (holdBox + 1) * delay, move);
                        }


                    }

                })();
            }
        }
    }
);
