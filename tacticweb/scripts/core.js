init = () => {

    $(document).ready(function() {

        $('.tipo-pagina').find('input').on('change', function() {
            var value = $(this).val();

            if ($(this).is(':checked')) {
                $('#files_upload').hide();
                $('#galeria').show();
            } else {
                $('#files_upload').show();
                $('#galeria').hide();
            }
        });

    });

}