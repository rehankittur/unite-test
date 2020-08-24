FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app
EXPOSE 80
EXPOSE 443
# copy csproj and restore as distinct layers
COPY *.csproj .
COPY *.csproj ./employeeservice/
COPY *.config ./employeeservice/
# RUN dotnet restore
RUN dotnet restore 

# copy everything else and build app
COPY . ./employeeservice/
WORKDIR /app/employeeservice
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/employeeservice/out ./
ENTRYPOINT ["dotnet", "Unite.Students.Integration.EmployeeAppService.dll"]