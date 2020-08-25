<%- include('header'); %>
<%- include('script'); %>

<div class="d-flex justify-content-center">
    <div class="col-auto my-1">
        <form class="form-inline" action='/country' method="post">
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" name="Countries">
                <% for(var i=0; i < values; i++) {%>
                <option value="<%= values[i].name %>"> <%= values[i].name.substring(0, 15) %> </option>
                <% } %>
            </select>
            <a href="/">Return</a>
        </form>
    </div>
</div>

<div style="margin-top:50px;" class="container">
    <div class="row">
        <div class="card col-sm" style="width: 40rem;">
            <% for(var i=0; i < values; i++) {%>
            <img class="card-img-top rounded mx-auto d-block" style="width:500px;" src=" <%= values[i].flag %> "
                alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center"><%= values[i].name %></h5>
                <div class="row">
                    <p class="col-6 col-sm-4 card-text text-info"> Capital: <%= values[i].capital %> </p>
                    <p class="col-6 col-sm-4 card-text text-info"> Region: <%= values[i].region %> </p>
                    <div class="w-100 d-none d-md-block">
                        <p class="col-6 col-lg-8 card-text text-info"> Subregion: <%= values[i].subregion %> </p>
                        <p class="col-6 col-lg-8 card-text text-info"> Demonym: <%= values[i].demonym %> </p>
                        <p class="col-6 col-lg-8 card-text text-info"> Population:
                            <%= new Intl.NumberFormat().format(values[i].population) %> </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card col-sm">
            <div class="card-header">
                <%= values[i].name %> Information
            </div>
            <div class="card-body">
                <p class="">With supporting text below as a natural lead-in to additional content.</p>
               
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-4"></div>
                        <a href="#" class="btn btn-primary col-4">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <% } %>
</div>

<%- include('footer'); %>