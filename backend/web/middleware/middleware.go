package middleware

import (
	"DynViz/models"
	"DynViz/web/handlers"
	"context"
	"net/http"
)

func Middleware(next http.Handler) http.Handler {

	var response models.Response
	var ctx context.Context

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if (r.URL.Path != "/login") && (r.URL.Path != "/signup") && (r.URL.Path != "/countries") && (r.URL.Path != "/countrycode") && (r.URL.Path != "/GETEMBED") {

			email, err := handlers.ProtectedHandler(w, r)
			if err != nil {
				response.Code = http.StatusInternalServerError
				response.Message = err.Error()
				return
			}

			ctx = context.WithValue(r.Context(), "LoggedUserEmail", email)
			next.ServeHTTP(w, r.WithContext(ctx))

		} else {
			next.ServeHTTP(w, r)
		}

		// Call the next handler, which can be another middleware in the chain, or the final handler.

		// next.ServeHTTP(w, r)

	})
}
